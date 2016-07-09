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
                'values': {
                    1: 'male',
                    2: 'female',
                    3: 'others/unknown'
                },
                'label': 'gender'
            },
            'family_group': {
                'values': {
                    1: 'z Letovic',
                    2: 'z Bludova',
                    3: 'z Pernštejna, Medlova',
                    4: 'z Klobouk',
                    5: 'z Myslibořic',
                    6: 'z Branišovic',
                    7: 'z Kněžic',
                    8: 'z Plavče',
                    9: 'z Deblína',
                    10: 'z Meziříčí, Tasova, Lomince atd.',
                    11: 'Tvrdišovci',
                    12: 'z Boskovic',
                    13: 'z Drahotuš',
                    14: 'z Kunštátu, Jevišovic, ..',
                    15: 'ze Šternberka',
                    16: 'Sirotkové',
                    17: 'Lichtenštejnové',
                    18: 'z Hustopeč',
                    19: 'ze Štrálku',
                    20: 'z Bílkov',
                    21: 'ze Švábenic',
                    22: 'z Rýzmburka',
                    23: 'z Kravař',
                    25: 'z Vartenberka',
                    26: 'z Hradce/Krumlova',
                    27: 'z Vildenberka',
                    28: 'z Cimburka',
                    29: 'z Lipé',
                    30: 'z Otoslavic',
                    31: 'z Ronova, Lichtenburka',
                    32: 'z Potštejna',
                    33: 'z Šelnberka',
                    34: 'z Holštejna, Vartnova',
                    35: 'z Bechyně',
                    38: 'ze Sovince',
                    40: 'z Pirkenštejna',
                    43: 'z Hardekka',
                    44: 'z Valdštejna',
                    47: 'z Michalovic',
                    49: 'zeměpán',
                    50: 'ostatní'
                },
                'label': 'family group'
            }
        },
        'links': {
            'type' :{
                'values': {
                    1: 'dower',
                    2: 'dowry',
                    3: 'others/unknown'
                },
                'label': 'type of interaction'
            }
        }
    }
}

print(out)
        
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
        

                    
with open('../data.json', 'w', encoding="utf8") as out_file:
    json.dump(out, out_file, ensure_ascii=False)