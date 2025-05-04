/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/* eslint-disable quotes */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('matcher').del()
    await knex('matcher').insert([
        {
            id: 1,
            match: 'ASDA SUPERSTORE',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T13:24:39.019Z',
            updated_on: '2025-01-06T13:24:39.019Z'
        },
        {
            id: 2,
            match: 'HOME BARGAINS',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T13:24:39.019Z',
            updated_on: '2025-01-06T13:24:39.019Z'
        },
        {
            id: 3,
            match: 'TESCO',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T13:24:39.019Z',
            updated_on: '2025-01-06T13:24:39.019Z'
        },
        {
            id: 4,
            match: 'ALDI',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T13:24:39.019Z',
            updated_on: '2025-01-06T13:24:39.019Z'
        },
        {
            id: 5,
            match: 'NON-GBP PURCH FEE',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T13:24:39.019Z',
            updated_on: '2025-01-06T13:24:39.019Z'
        },
        {
            id: 6,
            match: 'NON-GBP TRANS FEE',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T13:24:39.019Z',
            updated_on: '2025-01-06T13:24:39.019Z'
        },
        {
            id: 10,
            match: 'Bee Network Busses',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T13:24:39.019Z',
            updated_on: '2025-01-06T13:24:39.019Z'
        },
        {
            id: 14,
            match: 'SPOTIFY',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T13:24:39.019Z',
            updated_on: '2025-01-06T13:24:39.019Z'
        },
        {
            id: 15,
            match: 'Decathlon UK Limit',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T13:24:39.019Z',
            updated_on: '2025-01-06T13:24:39.019Z'
        },
        {
            id: 18,
            match: 'EE',
            match_type: 'start',
            case_sensitive: false,
            created_on: '2025-01-06T13:24:39.019Z',
            updated_on: '2025-01-06T13:24:39.019Z'
        },
        {
            id: 22,
            match: 'CITYBIKE',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T16:32:48.652Z',
            updated_on: '2025-01-06T16:32:48.652Z'
        },
        {
            id: 23,
            match: 'CTAX',
            match_type: 'any',
            case_sensitive: true,
            created_on: '2025-01-06T16:33:08.111Z',
            updated_on: '2025-01-06T16:33:08.111Z'
        },
        {
            id: 24,
            match: 'NothernRail',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T16:33:41.376Z',
            updated_on: '2025-01-06T16:33:41.376Z'
        },
        {
            id: 25,
            match: 'SKY INTERNET AND BROA',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T16:34:35.409Z',
            updated_on: '2025-01-06T16:34:35.409Z'
        },
        {
            id: 26,
            match: 'FREECODECAMP.ORG',
            match_type: 'exact',
            case_sensitive: false,
            created_on: '2025-01-06T16:35:09.413Z',
            updated_on: '2025-01-06T16:35:09.413Z'
        },
        {
            id: 28,
            match: 'SAINSBURYS',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T16:35:59.763Z',
            updated_on: '2025-01-06T16:35:59.763Z'
        },
        {
            id: 33,
            match: 'PATREON',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T16:38:20.486Z',
            updated_on: '2025-01-06T16:38:20.486Z'
        },
        {
            id: 34,
            match: 'DIRECTLINE INSURANCE',
            match_type: 'exact',
            case_sensitive: false,
            created_on: '2025-01-06T16:38:41.220Z',
            updated_on: '2025-01-06T16:38:41.220Z'
        },
        {
            id: 35,
            match: 'PAYROL',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T16:39:33.298Z',
            updated_on: '2025-01-06T16:39:33.298Z'
        },
        {
            id: 37,
            match: 'Catering Offices',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T16:55:41.849Z',
            updated_on: '2025-01-06T16:55:41.849Z'
        },
        {
            id: 38,
            match: 'Coop Airdre',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T17:16:59.905Z',
            updated_on: '2025-01-06T17:16:59.905Z'
        },
        {
            id: 39,
            match: 'EDINBURGH TRAMS LI',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T17:19:45.046Z',
            updated_on: '2025-01-06T17:19:45.046Z'
        },
        {
            id: 40,
            match: 'M&S SIMPLY FOOD',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T17:20:05.636Z',
            updated_on: '2025-01-06T17:20:05.636Z'
        },
        {
            id: 41,
            match: 'LIDL GB',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T17:34:01.148Z',
            updated_on: '2025-01-06T17:34:01.148Z'
        },
        {
            id: 43,
            match: 'TFL TRAVEL CH',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T17:44:38.547Z',
            updated_on: '2025-01-06T17:44:38.547Z'
        },
        {
            id: 44,
            match: 'JOLLIBEE',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T17:49:45.547Z',
            updated_on: '2025-01-06T17:49:45.547Z'
        },
        {
            id: 45,
            match: 'BOTANIC TEA ROOM',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T17:51:54.770Z',
            updated_on: '2025-01-06T17:51:54.770Z'
        }
    ])
    await knex('category').del()
    await knex('category').insert([
        {
            id: 1,
            label: 'Food',
            description: 'Any food related items or meals.',
            colour: '#509af3',
            created_on: '2025-01-06T13:24:39.037Z',
            updated_on: '2025-01-06T13:24:39.037Z'
        },
        {
            id: 2,
            label: 'Support & Donations',
            description: 'Any funds supporting organisations or other voluntery donations.',
            colour: '#4c9a2a',
            created_on: '2025-01-06T13:24:39.037Z',
            updated_on: '2025-01-06T13:24:39.037Z'
        },
        {
            id: 3,
            label: 'Travel',
            description: 'Travel expenses.',
            colour: '#ee204d',
            created_on: '2025-01-06T13:24:39.037Z',
            updated_on: '2025-01-06T13:24:39.037Z'
        },
        {
            id: 4,
            label: 'Healthcare',
            description: 'Health related costs.',
            colour: '#008080',
            created_on: '2025-01-06T13:24:39.037Z',
            updated_on: '2025-01-06T13:24:39.037Z'
        },
        {
            id: 5,
            label: 'Subscriptions',
            description: 'Monthly optional subscriptions.',
            colour: '#ecf0f1',
            created_on: '2025-01-06T13:24:39.037Z',
            updated_on: '2025-01-06T13:24:39.037Z'
        },
        {
            id: 6,
            label: 'Bike',
            description: 'Expenses related to the ebike.',
            colour: '#fb8d1a',
            created_on: '2025-01-06T13:24:39.037Z',
            updated_on: '2025-01-06T13:24:39.037Z'
        },
        {
            id: 7,
            label: 'Income',
            description: 'Any income sources.',
            colour: '#d8737f',
            created_on: '2025-01-06T13:24:39.037Z',
            updated_on: '2025-01-06T13:24:39.037Z'
        },
        {
            id: 8,
            label: 'Work',
            description: 'Work related expenses.',
            colour: '#f1c40f',
            created_on: '2025-01-06T13:24:39.037Z',
            updated_on: '2025-01-06T13:24:39.037Z'
        },
        {
            id: 9,
            label: 'Phone',
            description: 'Phone bill.',
            colour: '#d3dd18',
            created_on: '2025-01-06T13:24:39.037Z',
            updated_on: '2025-01-06T13:24:39.037Z'
        },
        {
            id: 10,
            label: 'Dentist',
            description: 'Dental bills.',
            colour: '#5650de',
            created_on: '2025-01-06T13:24:39.037Z',
            updated_on: '2025-01-06T13:24:39.037Z'
        },
        {
            id: 11,
            label: 'Dog',
            description: 'Dog specific costs separate from food (dog food considered groceries).',
            colour: '#eca252',
            created_on: '2025-01-06T13:24:39.037Z',
            updated_on: '2025-01-06T13:24:39.037Z'
        },
        {
            id: 12,
            label: 'Home',
            description: 'Related to home utilities & furniture etc.',
            colour: '#e84a5f',
            created_on: '2025-01-06T13:24:39.037Z',
            updated_on: '2025-01-06T13:24:39.037Z'
        },
        {
            id: 13,
            label: 'Savings',
            description: 'Savings & investments.',
            colour: '#0d1017',
            created_on: '2025-01-06T13:24:39.037Z',
            updated_on: '2025-01-06T13:24:39.037Z'
        },
        {
            id: 14,
            label: 'Mortgage',
            description: 'Rent, motgage & factor fees.',
            colour: '#34495e',
            created_on: '2025-01-06T13:24:39.037Z',
            updated_on: '2025-01-06T15:59:16.337Z'
        },
        {
            id: 15,
            label: 'Gifts',
            description: 'Gifts & presents for others.',
            colour: '#8857e6',
            created_on: '2025-01-06T13:24:39.037Z',
            updated_on: '2025-01-06T13:24:39.037Z'
        },
        {
            id: 16,
            label: 'Garden',
            description: 'Garden related expendature.',
            colour: '#2f1629',
            created_on: '2025-01-06T13:24:39.037Z',
            updated_on: '2025-01-06T13:24:39.037Z'
        },
        {
            id: 17,
            label: 'Clothes',
            description: 'Clothing & accessories.',
            colour: '#16a085',
            created_on: '2025-01-06T13:24:39.037Z',
            updated_on: '2025-01-06T13:24:39.037Z'
        },
        {
            id: 18,
            label: 'Hobbies',
            description: 'Anything related to recrational activities / equipment',
            colour: '#3bc1d4',
            created_on: '2025-01-06T16:00:43.952Z',
            updated_on: '2025-01-06T16:00:43.952Z'
        },
        {
            id: 19,
            label: 'Account Transfer',
            description: 'Used for moving money between accounts',
            colour: '#bec3c7',
            created_on: '2025-01-06T16:01:21.936Z',
            updated_on: '2025-01-06T16:01:21.936Z'
        },
        {
            id: 20,
            label: 'Utilities',
            description: 'Generic category for any home-related bills or utility payments',
            colour: '#fb701a',
            created_on: '2025-01-06T16:06:31.071Z',
            updated_on: '2025-01-06T16:06:43.415Z'
        }
    ])
    await knex('category_matcher').del()
    await knex('category_matcher').insert([
        {
            id: 1,
            category_id: 1,
            matcher_id: 1
        },
        {
            id: 2,
            category_id: 1,
            matcher_id: 2
        },
        {
            id: 3,
            category_id: 1,
            matcher_id: 3
        },
        {
            id: 4,
            category_id: 1,
            matcher_id: 4
        },
        {
            id: 5,
            category_id: 2,
            matcher_id: 5
        },
        {
            id: 6,
            category_id: 2,
            matcher_id: 6
        },
        {
            id: 10,
            category_id: 3,
            matcher_id: 10
        },
        {
            id: 12,
            category_id: 4,
            matcher_id: 12
        },
        {
            id: 13,
            category_id: 4,
            matcher_id: 13
        },
        {
            id: 15,
            category_id: 6,
            matcher_id: 15
        },
        {
            id: 18,
            category_id: 9,
            matcher_id: 18
        },
        {
            id: 22,
            category_id: 3,
            matcher_id: 22
        },
        {
            id: 23,
            category_id: 20,
            matcher_id: 23
        },
        {
            id: 24,
            category_id: 3,
            matcher_id: 24
        },
        {
            id: 25,
            category_id: 20,
            matcher_id: 25
        },
        {
            id: 26,
            category_id: 2,
            matcher_id: 26
        },
        {
            id: 28,
            category_id: 1,
            matcher_id: 28
        },
        {
            id: 33,
            category_id: 2,
            matcher_id: 33
        },
        {
            id: 34,
            category_id: 20,
            matcher_id: 34
        },
        {
            id: 35,
            category_id: 14,
            matcher_id: 35
        },
        {
            id: 37,
            category_id: 1,
            matcher_id: 37
        },
        {
            id: 38,
            category_id: 1,
            matcher_id: 38
        },
        {
            id: 39,
            category_id: 3,
            matcher_id: 39
        },
        {
            id: 40,
            category_id: 1,
            matcher_id: 40
        },
        {
            id: 41,
            category_id: 1,
            matcher_id: 41
        },
        {
            id: 42,
            category_id: 1,
            matcher_id: 42
        },
        {
            id: 43,
            category_id: 3,
            matcher_id: 43
        },
        {
            id: 44,
            category_id: 1,
            matcher_id: 44
        },
        {
            id: 45,
            category_id: 1,
            matcher_id: 45
        }
    ])
}
