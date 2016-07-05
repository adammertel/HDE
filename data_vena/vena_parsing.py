import csv
import json

out = {
    'nodes':[],
    'links': [], 
    'defaultProps': {
        'nodes': 
            {'name': 'name', 'group': 'gender'}, 
        'links': 
            {'time': 'time', 'type': 'type'}
    }, 
    'legend': {
        'nodes': {
            'gender': {
                'values': [
                    {1: 'male'},
                    {2: 'female'},
                    {3: 'others/unknown'}
                ]
            }
        },
        'links': {
            'type' :{
                'values': [
                    {1: 'obveneni'},
                    {2: 'veno'}
                ]
            }
        }
    }
}

        
        
with open("people.csv", "r", encoding="utf8") as people_file:
    reader = csv.DictReader(people_file)
    rows = list(reader)
    for i, row in enumerate(rows):
        if (row['location_x'] != '?' or row['location_y'] != '?'):
            coords = [float(row['location_x']), float(row['location_y'])]
        else:
            coords = [0,0]
            
        gender = 1 if row['gender'] == 'm' else 2
            
        out['nodes'].append({
            'id': int(row['id']),
            'coords': coords,
            'props': {
                'name': row['Label'],
                'group': row['group'],
                'condition': row['condition'],
                'gender': gender
            },
        })
            
           
           
with open("interactions.csv", "r", encoding="utf8") as links_file:
    reader = csv.DictReader(links_file)
    rows = list(reader)
    for i, row in enumerate(rows):
        
        type = 1 if row['type'] == 'obveneni' else 2
        time = int(''.join(i for i in row['year'] if i.isdigit())[:4])
        
        # test people
        if (row['Source'] != '0' and row['Target'] != '0' and time > 1320):
            
                
            out['links'].append({
                'id': i,
                'source': int(row['Source']) - 1,
                'target': int(row['Target']) - 1,
                'props': {
                    # temporal solution
                    'time': time,
                    'type': type,
                    'quantity': row['quantity']
                },
            })
        
                    
with open('../data.json', 'w' , encoding="utf8") as out_file:
    json.dump(out, out_file, ensure_ascii=False)