/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/* eslint-disable quotes */
const { v4: uuid } = require('uuid')
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('matcher').del()
    await knex('matcher').insert([
        {
            id: '1abb45aa-05bf-4172-ae73-79117969aaf5', // was 1
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            match: 'ASDA SUPERSTORE',
            match_type: 'any',
            case_sensitive: false,
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: '51189223-8688-48e5-9d57-c4e343c01175', // was 2
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            match: 'HOME BARGAINS',
            match_type: 'any',
            case_sensitive: false,
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: 'e56221ba-b789-44af-b1fc-a68d526a3239', // was 3
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            match: 'TESCO',
            match_type: 'any',
            case_sensitive: false,
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: '9bd9f7c5-2f0e-4d9c-8157-20814cd47a9e', // was 4
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            match: 'ALDI',
            match_type: 'any',
            case_sensitive: false,
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: 'b9d7eb87-ad01-40a8-b61b-baeeb06e3198', // was 5
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            match: 'NON-GBP PURCH FEE',
            match_type: 'any',
            case_sensitive: false,
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: '4e5a849b-250b-4c7d-866f-d2961339e6e9', // was 6
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            match: 'NON-GBP TRANS FEE',
            match_type: 'any',
            case_sensitive: false,
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: '48768fa6-f648-42aa-85cc-9bc800d2f516', // was 10
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            match: 'Bee Network Busses',
            match_type: 'any',
            case_sensitive: false,
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: '64305135-e331-4dbe-b8a9-8c0a05cab793', // was 14
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            match: 'SPOTIFY',
            match_type: 'any',
            case_sensitive: false,
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: '00ec2f23-468f-4a92-9fe3-0f55358f1f08', // was 15
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            match: 'Decathlon UK Limit',
            match_type: 'any',
            case_sensitive: false,
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: '174c556d-bf7a-4c8a-a385-ed323a1e9eed', // was 18
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            match: 'EE',
            match_type: 'start',
            case_sensitive: false,
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: '95f6d870-cf1f-4762-8494-015db5570467', // was 22
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            match: 'CITYBIKE',
            match_type: 'any',
            case_sensitive: false,
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: 'b8978001-1f4d-4656-8b1c-6a1f51543d12', // was 23
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            match: 'CTAX',
            match_type: 'any',
            case_sensitive: true,
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: '21efc634-502f-485e-ba5f-bb3b848b469b', // was 24
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            match: 'NothernRail',
            match_type: 'any',
            case_sensitive: false,
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: 'edce724c-513a-4706-ac99-7d74e16c9ccc', // was 25
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            match: 'SKY INTERNET AND BROA',
            match_type: 'any',
            case_sensitive: false,
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: '12c76185-36d1-40ef-bfca-9902b6ed17c2', // was 26
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            match: 'FREECODECAMP.ORG',
            match_type: 'exact',
            case_sensitive: false,
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: '88fbdfc5-3c9d-4804-acc9-8ea3b63d9408', // was 28
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            match: 'SAINSBURYS',
            match_type: 'any',
            case_sensitive: false,
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: 'd89c963b-ac4a-4d66-aac9-a8c4ccb7b5bd', // was 33
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            match: 'PATREON',
            match_type: 'any',
            case_sensitive: false,
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: 'ae5f532b-0d6b-440b-9ed8-d5139b5cac1b', // was 34
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            match: 'DIRECTLINE INSURANCE',
            match_type: 'exact',
            case_sensitive: false,
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: 'af24d9c3-7178-4b3b-9c8c-e642fa78e2af', // was 35
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            match: 'PAYROL',
            match_type: 'any',
            case_sensitive: false,
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: '92e1140f-2f0b-47ad-a5ca-a670b94d92c6', // was 37
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            match: 'Catering Offices',
            match_type: 'any',
            case_sensitive: false,
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: '11578748-9f63-47cb-8ec8-335e3e03453c', // was 38
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            match: 'Coop Airdre',
            match_type: 'any',
            case_sensitive: false,
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: '40fd5715-392e-4a58-a705-8f9f5a4262e4', // was 39
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            match: 'EDINBURGH TRAMS LI',
            match_type: 'any',
            case_sensitive: false,
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: '81e14708-9846-4fad-95ea-07de9e7785c6', // was 40
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            match: 'M&S SIMPLY FOOD',
            match_type: 'any',
            case_sensitive: false,
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: 'e73bae12-3068-4cb3-9520-f19802e2cd9b', // was 41
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            match: 'LIDL GB',
            match_type: 'any',
            case_sensitive: false,
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: 'a9540c01-c5dd-43c3-9ec9-ca935b62fd79', // was 43
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            match: 'TFL TRAVEL CH',
            match_type: 'any',
            case_sensitive: false,
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: 'e9443b63-ac7f-4d53-bbee-02bfbf522571', // was 44
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            match: 'JOLLIBEE',
            match_type: 'any',
            case_sensitive: false,
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: '95e5047e-d79f-46d6-af69-435bd24bdca7', // was 45
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            match: 'BOTANIC TEA ROOM',
            match_type: 'any',
            case_sensitive: false,
            created_on: new Date(),
            updated_on: new Date()
        }
    ])
    await knex('category').del()  
    await knex('category').insert([
        {
            id: '486f9685-cc57-45f4-a2e7-fc505840de6a', // was 1
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            label: 'Food',
            description: 'Any food related items or meals.',
            colour: '#509af3',
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: '4b8614e2-4f8d-41e2-8d62-7163eefa6812', // was 2
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            label: 'Support & Donations',
            description: 'Any funds supporting organisations or other voluntery donations.',
            colour: '#4c9a2a',
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3', // was 3
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            label: 'Travel',
            description: 'Travel expenses.',
            colour: '#ee204d',
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: '1c82556b-ba33-4e91-ab68-3ace780d4452', // was 4
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            label: 'Healthcare',
            description: 'Health related costs.',
            colour: '#008080',
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: '7364d968-1058-48dc-bdbb-c8268a97bdf5', // was 5
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            label: 'Subscriptions',
            description: 'Monthly optional subscriptions.',
            colour: '#ecf0f1',
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: '0864b74e-6c5b-416d-a8c3-75d5fa8fb514', // was 6
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            label: 'Bike',
            description: 'Expenses related to the ebike.',
            colour: '#fb8d1a',
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: '8ca3ae7e-1dc8-4e76-ad1e-ba6518a18778', // was 7
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            label: 'Income',
            description: 'Any income sources.',
            colour: '#d8737f',
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: 'edd2e45e-9812-4f7c-bed3-8076af572b1a', // was 8
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            label: 'Work',
            description: 'Work related expenses.',
            colour: '#f1c40f',
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: '7096c6d4-2280-4334-a817-4c2e4ab848e9', // was 9
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            label: 'Phone',
            description: 'Phone bill.',
            colour: '#d3dd18',
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: '2ec895de-e28e-44a1-94d9-f2ded36203cc', // was 10
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            label: 'Dentist',
            description: 'Dental bills.',
            colour: '#5650de',
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: '348a943b-1b9c-4d92-a6a4-15d3693cba72', // was 11
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            label: 'Dog',
            description: 'Dog specific costs separate from food (dog food considered groceries).',
            colour: '#eca252',
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: '0e128ac1-d0be-4009-8fae-89795875199d', // was 12
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            label: 'Home',
            description: 'Related to home utilities & furniture etc.',
            colour: '#e84a5f',
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: 'e947cb52-fd88-438f-acb8-b320d78f410f', // was 13
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            label: 'Savings',
            description: 'Savings & investments.',
            colour: '#0d1017',
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: '14d16a6e-56e1-41f3-aa45-dbbdf2ccb972', // was 14
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            label: 'Mortgage',
            description: 'Rent, motgage & factor fees.',
            colour: '#34495e',
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: 'd90584a7-4c3c-4b0e-8eee-494a16837189', // was 15
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            label: 'Gifts',
            description: 'Gifts & presents for others.',
            colour: '#8857e6',
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: '59dedd58-2e3e-4615-8e1a-ff82657e3885', // was 16
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            label: 'Garden',
            description: 'Garden related expendature.',
            colour: '#2f1629',
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: '34346c5a-c67c-40e5-bf23-ed8ad127af40', // was 17
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            label: 'Clothes',
            description: 'Clothing & accessories.',
            colour: '#16a085',
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: '3d84b0a8-f4b2-4464-96ac-43e8babd2156', // was 18
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            label: 'Hobbies',
            description: 'Anything related to recrational activities / equipment',
            colour: '#3bc1d4',
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: '15d150b4-9eb5-42a5-bc36-88420bc4dd0d', // was 19
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            label: 'Account Transfer',
            description: 'Used for moving money between accounts',
            colour: '#bec3c7',
            created_on: new Date(),
            updated_on: new Date()
        },
        {
            id: '11002146-43f2-45a8-91f8-f718b5f34de3', // was 20
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            label: 'Utilities',
            description: 'Generic category for any home-related bills or utility payments',
            colour: '#fb701a',
            created_on: new Date(),
            updated_on: new Date()
        }
    ])
    await knex('category_matcher').del()
    await knex('category_matcher').insert([
        {
            id: uuid(),
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            matcher_id: '1abb45aa-05bf-4172-ae73-79117969aaf5'
        },
        {
            id: uuid(),
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            matcher_id: '51189223-8688-48e5-9d57-c4e343c01175'
        },
        {
            id: uuid(),
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            matcher_id: 'e56221ba-b789-44af-b1fc-a68d526a3239'
        },
        {
            id: uuid(),
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            matcher_id: '9bd9f7c5-2f0e-4d9c-8157-20814cd47a9e'
        },
        {
            id: uuid(),
            category_id: '4b8614e2-4f8d-41e2-8d62-7163eefa6812',
            matcher_id: 'b9d7eb87-ad01-40a8-b61b-baeeb06e3198'
        },
        {
            id: uuid(),
            category_id: '4b8614e2-4f8d-41e2-8d62-7163eefa6812',
            matcher_id: '4e5a849b-250b-4c7d-866f-d2961339e6e9'
        },
        {
            id: uuid(),
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            matcher_id: '48768fa6-f648-42aa-85cc-9bc800d2f516'
        },
        {
            id: uuid(),
            category_id: '0864b74e-6c5b-416d-a8c3-75d5fa8fb514',
            matcher_id: '00ec2f23-468f-4a92-9fe3-0f55358f1f08'
        },
        {
            id: uuid(),
            category_id: '7096c6d4-2280-4334-a817-4c2e4ab848e9',
            matcher_id: '174c556d-bf7a-4c8a-a385-ed323a1e9eed'
        },
        {
            id: uuid(),
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            matcher_id: '95f6d870-cf1f-4762-8494-015db5570467'
        },
        {
            id: uuid(),
            category_id: '11002146-43f2-45a8-91f8-f718b5f34de3',
            matcher_id: 'b8978001-1f4d-4656-8b1c-6a1f51543d12'
        },
        {
            id: uuid(),
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            matcher_id: '21efc634-502f-485e-ba5f-bb3b848b469b'
        },
        {
            id: uuid(),
            category_id: '11002146-43f2-45a8-91f8-f718b5f34de3',
            matcher_id: 'edce724c-513a-4706-ac99-7d74e16c9ccc'
        },
        {
            id: uuid(),
            category_id: '4b8614e2-4f8d-41e2-8d62-7163eefa6812',
            matcher_id: '12c76185-36d1-40ef-bfca-9902b6ed17c2'
        },
        {
            id: uuid(),
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            matcher_id: '88fbdfc5-3c9d-4804-acc9-8ea3b63d9408'
        },
        {
            id: uuid(),
            category_id: '4b8614e2-4f8d-41e2-8d62-7163eefa6812',
            matcher_id: 'd89c963b-ac4a-4d66-aac9-a8c4ccb7b5bd'
        },
        {
            id: uuid(),
            category_id: '11002146-43f2-45a8-91f8-f718b5f34de3',
            matcher_id: 'ae5f532b-0d6b-440b-9ed8-d5139b5cac1b'
        },
        {
            id: uuid(),
            category_id: '14d16a6e-56e1-41f3-aa45-dbbdf2ccb972',
            matcher_id: 'af24d9c3-7178-4b3b-9c8c-e642fa78e2af'
        },
        {
            id: uuid(),
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            matcher_id: '92e1140f-2f0b-47ad-a5ca-a670b94d92c6'
        },
        {
            id: uuid(),
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            matcher_id: '11578748-9f63-47cb-8ec8-335e3e03453c'
        },
        {
            id: uuid(),
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            matcher_id: '40fd5715-392e-4a58-a705-8f9f5a4262e4'
        },
        {
            id: uuid(),
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            matcher_id: '81e14708-9846-4fad-95ea-07de9e7785c6'
        },
        {
            id: uuid(),
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            matcher_id: 'e73bae12-3068-4cb3-9520-f19802e2cd9b'
        },
        {
            id: uuid(),
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            matcher_id: 'a9540c01-c5dd-43c3-9ec9-ca935b62fd79'
        },
        {
            id: uuid(),
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            matcher_id: 'e9443b63-ac7f-4d53-bbee-02bfbf522571'
        },
        {
            id: uuid(),
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            matcher_id: '95e5047e-d79f-46d6-af69-435bd24bdca7'
        }
    ])
}
