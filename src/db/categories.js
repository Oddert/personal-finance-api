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
            id: 7,
            match: 'PAYPAL *PATREONIRE',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T13:24:39.019Z',
            updated_on: '2025-01-06T13:24:39.019Z'
        },
        {
            id: 8,
            match: 'PAYPAL *PATREON M',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T13:24:39.019Z',
            updated_on: '2025-01-06T13:24:39.019Z'
        },
        {
            id: 9,
            match: 'PAYPAL *PATREON M',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T13:24:39.019Z',
            updated_on: '2025-01-06T13:24:39.019Z'
        },
        {
            id: 10,
            match: 'FIRST GLASGOW',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T13:24:39.019Z',
            updated_on: '2025-01-06T13:24:39.019Z'
        },
        {
            id: 11,
            match: 'PATTERTON STN SST',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T13:24:39.019Z',
            updated_on: '2025-01-06T13:24:39.019Z'
        },
        {
            id: 12,
            match: 'OGPS-GP',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T13:24:39.019Z',
            updated_on: '2025-01-06T13:24:39.019Z'
        },
        {
            id: 13,
            match: 'GOCARDLESS',
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
            id: 16,
            match: 'NATWEST HRPS PAYRO',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T13:24:39.019Z',
            updated_on: '2025-01-06T13:24:39.019Z'
        },
        {
            id: 17,
            match: 'GOOGLE*CLOUD',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T13:24:39.019Z',
            updated_on: '2025-01-06T13:24:39.019Z'
        },
        {
            id: 18,
            match: 'VODAFONE',
            match_type: 'start',
            case_sensitive: false,
            created_on: '2025-01-06T13:24:39.019Z',
            updated_on: '2025-01-06T13:24:39.019Z'
        },
        {
            id: 19,
            match: 'INDEPENDENT CARE P',
            match_type: 'exact',
            case_sensitive: true,
            created_on: '2025-01-06T13:24:39.019Z',
            updated_on: '2025-01-06T13:24:39.019Z'
        },
        {
            id: 20,
            match: 'JULIAN MAUGER',
            match_type: 'exact',
            case_sensitive: true,
            created_on: '2025-01-06T13:24:39.019Z',
            updated_on: '2025-01-06T13:24:39.019Z'
        },
        {
            id: 21,
            match: 'KEYSTORE',
            match_type: 'start',
            case_sensitive: false,
            created_on: '2025-01-06T16:32:27.159Z',
            updated_on: '2025-01-06T16:32:27.159Z'
        },
        {
            id: 22,
            match: 'NEXTBIKE',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T16:32:48.652Z',
            updated_on: '2025-01-06T16:32:48.652Z'
        },
        {
            id: 23,
            match: 'GLASGOW-CTAX',
            match_type: 'any',
            case_sensitive: true,
            created_on: '2025-01-06T16:33:08.111Z',
            updated_on: '2025-01-06T16:33:08.111Z'
        },
        {
            id: 24,
            match: 'Scotrail',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T16:33:41.376Z',
            updated_on: '2025-01-06T16:33:41.376Z'
        },
        {
            id: 25,
            match: 'VIRGIN MEDIA PYMTS',
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
            id: 27,
            match: 'PAYPAL *XSOLLA',
            match_type: 'start',
            case_sensitive: false,
            created_on: '2025-01-06T16:35:32.128Z',
            updated_on: '2025-01-06T16:35:32.128Z'
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
            id: 29,
            match: 'CLOUD',
            match_type: 'start',
            case_sensitive: true,
            created_on: '2025-01-06T16:36:29.771Z',
            updated_on: '2025-01-06T16:36:29.771Z'
        },
        {
            id: 30,
            match: 'PAYPAL *PATREON',
            match_type: 'start',
            case_sensitive: false,
            created_on: '2025-01-06T16:37:12.892Z',
            updated_on: '2025-01-06T16:37:12.892Z'
        },
        {
            id: 31,
            match: 'OCTOPUS',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T16:37:30.680Z',
            updated_on: '2025-01-06T16:37:30.680Z'
        },
        {
            id: 32,
            match: 'Rouken Glen Garden',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T16:37:56.167Z',
            updated_on: '2025-01-06T16:37:56.167Z'
        },
        {
            id: 33,
            match: 'PAYPAL *PATREON  M',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T16:38:20.486Z',
            updated_on: '2025-01-06T16:38:20.486Z'
        },
        {
            id: 34,
            match: 'ADMIRAL INSURANCE',
            match_type: 'exact',
            case_sensitive: false,
            created_on: '2025-01-06T16:38:41.220Z',
            updated_on: '2025-01-06T16:38:41.220Z'
        },
        {
            id: 35,
            match: 'HALIFAX',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T16:39:33.298Z',
            updated_on: '2025-01-06T16:39:33.298Z'
        },
        {
            id: 36,
            match: 'BENUGO- THE BURREL',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T16:40:05.009Z',
            updated_on: '2025-01-06T16:40:05.009Z'
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
            match: 'Day today',
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
            match: 'LIDL GB GLASGOW',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T17:34:01.148Z',
            updated_on: '2025-01-06T17:34:01.148Z'
        },
        {
            id: 42,
            match: 'KELVINGROVE VISA',
            match_type: 'any',
            case_sensitive: false,
            created_on: '2025-01-06T17:41:23.232Z',
            updated_on: '2025-01-06T17:41:23.232Z'
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
            label: 'food',
            description: 'Any food related items or meals.',
            colour: '#509af3',
            created_on: '2025-01-06T13:24:39.037Z',
            updated_on: '2025-01-06T13:24:39.037Z'
        },
        {
            id: 2,
            label: 'support',
            description: 'Any funds supporting organisations or other voluntery donations.',
            colour: '#4c9a2a',
            created_on: '2025-01-06T13:24:39.037Z',
            updated_on: '2025-01-06T13:24:39.037Z'
        },
        {
            id: 3,
            label: 'travel',
            description: 'Travel expenses.',
            colour: '#ee204d',
            created_on: '2025-01-06T13:24:39.037Z',
            updated_on: '2025-01-06T13:24:39.037Z'
        },
        {
            id: 4,
            label: 'health',
            description: 'Health related costs.',
            colour: '#008080',
            created_on: '2025-01-06T13:24:39.037Z',
            updated_on: '2025-01-06T13:24:39.037Z'
        },
        {
            id: 5,
            label: 'subscriptions',
            description: 'Monthly optional subscriptions.',
            colour: '#ecf0f1',
            created_on: '2025-01-06T13:24:39.037Z',
            updated_on: '2025-01-06T13:24:39.037Z'
        },
        {
            id: 6,
            label: 'bike',
            description: 'Expenses related to the ebike.',
            colour: '#fb8d1a',
            created_on: '2025-01-06T13:24:39.037Z',
            updated_on: '2025-01-06T13:24:39.037Z'
        },
        {
            id: 7,
            label: 'income',
            description: 'Any income sources.',
            colour: '#d8737f',
            created_on: '2025-01-06T13:24:39.037Z',
            updated_on: '2025-01-06T13:24:39.037Z'
        },
        {
            id: 8,
            label: 'work',
            description: 'Work related expenses.',
            colour: '#f1c40f',
            created_on: '2025-01-06T13:24:39.037Z',
            updated_on: '2025-01-06T13:24:39.037Z'
        },
        {
            id: 9,
            label: 'phone',
            description: 'Phone bill.',
            colour: '#d3dd18',
            created_on: '2025-01-06T13:24:39.037Z',
            updated_on: '2025-01-06T13:24:39.037Z'
        },
        {
            id: 10,
            label: 'dentist',
            description: 'Dental bills.',
            colour: '#5650de',
            created_on: '2025-01-06T13:24:39.037Z',
            updated_on: '2025-01-06T13:24:39.037Z'
        },
        {
            id: 11,
            label: 'therapy',
            description: 'Therapy bills.',
            colour: '#881798',
            created_on: '2025-01-06T13:24:39.037Z',
            updated_on: '2025-01-06T13:24:39.037Z'
        },
        {
            id: 12,
            label: 'home',
            description: 'Related to home utilities & life comfort.',
            colour: '#e84a5f',
            created_on: '2025-01-06T13:24:39.037Z',
            updated_on: '2025-01-06T13:24:39.037Z'
        },
        {
            id: 13,
            label: 'investment',
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
            label: 'gifts',
            description: 'Gifts & presents for others.',
            colour: '#8857e6',
            created_on: '2025-01-06T13:24:39.037Z',
            updated_on: '2025-01-06T13:24:39.037Z'
        },
        {
            id: 16,
            label: 'garden',
            description: 'Garden related expendature.',
            colour: '#2f1629',
            created_on: '2025-01-06T13:24:39.037Z',
            updated_on: '2025-01-06T13:24:39.037Z'
        },
        {
            id: 17,
            label: 'clothes',
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
            id: 7,
            category_id: 2,
            matcher_id: 7
        },
        {
            id: 8,
            category_id: 2,
            matcher_id: 8
        },
        {
            id: 9,
            category_id: 2,
            matcher_id: 9
        },
        {
            id: 10,
            category_id: 3,
            matcher_id: 10
        },
        {
            id: 11,
            category_id: 3,
            matcher_id: 11
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
            id: 14,
            category_id: 5,
            matcher_id: 14
        },
        {
            id: 15,
            category_id: 6,
            matcher_id: 15
        },
        {
            id: 16,
            category_id: 7,
            matcher_id: 16
        },
        {
            id: 17,
            category_id: 8,
            matcher_id: 17
        },
        {
            id: 18,
            category_id: 9,
            matcher_id: 18
        },
        {
            id: 19,
            category_id: 10,
            matcher_id: 19
        },
        {
            id: 20,
            category_id: 11,
            matcher_id: 20
        },
        {
            id: 21,
            category_id: 1,
            matcher_id: 21
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
            id: 27,
            category_id: 2,
            matcher_id: 27
        },
        {
            id: 28,
            category_id: 1,
            matcher_id: 28
        },
        {
            id: 29,
            category_id: 8,
            matcher_id: 29
        },
        {
            id: 30,
            category_id: 2,
            matcher_id: 30
        },
        {
            id: 31,
            category_id: 20,
            matcher_id: 31
        },
        {
            id: 32,
            category_id: 16,
            matcher_id: 32
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
            id: 36,
            category_id: 1,
            matcher_id: 36
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

// SWITCH(
//   "ASDA SUPERSTORE", "food",
//   "HOME BARGAINS", "food",

//   "NON-GBP PURCH FEE", "support",
//   "NON-GBP TRANS FEE", "support",
//   "PAYPAL *PATREONIRE", "support",
//   "PAYPAL *PATREON M", "support",
//   "PAYPAL *PATREON M", "support",

//   "FIRST GLASGOW", "travel",
//   "PATTERTON STN SST", "travel",

//   "OGPS-GP", "health",
//   "OGPS-GP", "health",
//   "GOCARDLESS", "health",

//   "SPOTIFY", "subscriptions",
//   "Decathlon UK Limit", "bike",
//   "NATWEST HRPS PAYRO", "income",
//   "GOOGLE*CLOUD KR33W", "work",
//   "VODAFONE LTD", "phone",
//   "INDEPENDENT CARE P", "dentist",
//   "JULIAN MAUGER", "therapy",
// )