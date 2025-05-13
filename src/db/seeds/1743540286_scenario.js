const { v4: uuid } = require('uuid');
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.extend(customParseFormat);

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    const scenarioUuid = uuid();
    await knex('scenario').del();
    await knex('scenario').insert([
        {
            id: scenarioUuid,
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
            start_date: new Date(dayjs().date(6).month(2).valueOf()), // '6 feb 2024'
            end_date: null,
            title: 'BAU',
            description: 'Business as usual',
            start_ballance: 1943,
        },
    ]);
    await knex('transactor').del();
    await knex('transactor').insert([
        {
            id: '1fb5481f-a257-48e3-beed-2c099a63006b',
            scenario_id: scenarioUuid,
            description: 'Mortgage',
            created_on: new Date(),
            updated_on: new Date(),
            value: 600.55,
            is_addition: false,
        },
        {
            id: '06dd500e-b7f5-4aa1-a4af-bc45bebce138',
            scenario_id: scenarioUuid,
            description: 'Salary',
            created_on: new Date(),
            updated_on: new Date(),
            value: 1894.28,
            is_addition: true,
        },
        {
            id: '5891d4d5-4873-4aab-b911-d4c12600be7e',
            scenario_id: scenarioUuid,
            description: 'Food',
            created_on: new Date(),
            updated_on: new Date(),
            value: 100,
            is_addition: false,
        },
        {
            id: 'a0bc07f7-bde3-410c-9a30-d5d5154ca418',
            scenario_id: scenarioUuid,
            description: 'Council Tax',
            created_on: new Date(),
            updated_on: new Date(),
            value: 166,
            is_addition: false,
        },
        {
            id: 'f442d1e3-4a86-40af-9316-c2a078d53e2b',
            scenario_id: scenarioUuid,
            description: 'Energy',
            created_on: new Date(),
            updated_on: new Date(),
            value: 160,
            is_addition: false,
        },
        {
            id: 'ce999b56-e1c0-4a73-a486-bb7c4fdb97ff',
            scenario_id: scenarioUuid,
            description: 'Dentist',
            created_on: new Date(),
            updated_on: new Date(),
            value: 22,
            is_addition: false,
        },
        {
            id: '4121eb31-591c-4b1e-9ce2-6c4f30c33180',
            scenario_id: scenarioUuid,
            description: 'Phone',
            created_on: new Date(),
            updated_on: new Date(),
            value: 39.18,
            is_addition: false,
        },
        {
            id: '7fb56243-3bf5-4cd1-8d67-8aaac0b69385',
            scenario_id: scenarioUuid,
            description: 'Home Insurance',
            created_on: new Date(),
            updated_on: new Date(),
            value: 25.25,
            is_addition: false,
        },
        {
            id: 'e711083e-22bf-426a-b70a-35035e1d830d',
            scenario_id: scenarioUuid,
            description: 'EE',
            created_on: new Date(),
            updated_on: new Date(),
            value: 68,
            is_addition: false,
        },
        {
            id: 'ec8d1f38-b521-46fd-9271-a70fd99850fb',
            scenario_id: scenarioUuid,
            description: 'Spotify',
            created_on: new Date(),
            updated_on: new Date(),
            value: 10.99,
            is_addition: false,
        },
        {
            id: '69608c9d-213a-486a-9048-e07ca1bf6e16',
            scenario_id: scenarioUuid,
            description: 'Free Code Camp',
            created_on: new Date(),
            updated_on: new Date(),
            value: 4.61,
            is_addition: false,
        },
        {
            id: '4a0da5eb-8bb9-46fc-9252-d7b4c94375ec',
            scenario_id: scenarioUuid,
            description: 'Website',
            created_on: new Date(),
            updated_on: new Date(),
            value: 25.5,
            is_addition: false,
        },
    ]);
    await knex('scheduler').del();
    await knex('scheduler').insert([
        {
            id: 1,
            transactor_id: '1fb5481f-a257-48e3-beed-2c099a63006b',
            scheduler_code: 'DAY',
            day: 22,
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: 2,
            transactor_id: '06dd500e-b7f5-4aa1-a4af-bc45bebce138',
            scheduler_code: 'SCALAR',
            created_on: new Date(),
            updated_on: new Date(),
            step: 31,
            start_date: new Date(dayjs().date(18).month(1).valueOf()), // '18 january 2024'
        },
        {
            id: 3,
            transactor_id: '5891d4d5-4873-4aab-b911-d4c12600be7e',
            scheduler_code: 'SCALAR',
            created_on: new Date(),
            updated_on: new Date(),
            step: 7,
            start_date: new Date(dayjs().date(6).month(1).valueOf()), // '6 january 2024'
        },
        {
            id: 4,
            transactor_id: 'c349163f-8f41-466e-91ec-1ba84e6731c0',
            scheduler_code: 'DAY',
            day: 23,
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: 5,
            transactor_id: 'ee2ef636-ffe1-441f-b7ef-86f43b6afaff',
            scheduler_code: 'SCALAR',
            created_on: new Date(),
            updated_on: new Date(),
            step: 7,
            start_date: new Date(dayjs().date(1).month(1).valueOf()), // '1 january 2024'
        },
        {
            id: 6,
            transactor_id: 'a0bc07f7-bde3-410c-9a30-d5d5154ca418',
            scheduler_code: 'DAY',
            day: 29,
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: 7,
            transactor_id: 'f442d1e3-4a86-40af-9316-c2a078d53e2b',
            scheduler_code: 'DAY',
            day: 22,
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: 8,
            transactor_id: 'ce999b56-e1c0-4a73-a486-bb7c4fdb97ff',
            scheduler_code: 'DAY',
            day: 5,
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: 9,
            transactor_id: '4121eb31-591c-4b1e-9ce2-6c4f30c33180',
            scheduler_code: 'DAY',
            day: 5,
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: 10,
            transactor_id: '7fb56243-3bf5-4cd1-8d67-8aaac0b69385',
            scheduler_code: 'DAY',
            day: 5,
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: 11,
            transactor_id: 'fa4e4880-0c6f-4465-b202-93df5a9b08b7',
            scheduler_code: 'SCALAR',
            created_on: new Date(),
            updated_on: new Date(),
            step: 365,
            start_date: new Date(dayjs().date(12).month(2).valueOf()), // '12 february 2024'
        },
        {
            id: 12,
            transactor_id: 'e711083e-22bf-426a-b70a-35035e1d830d',
            scheduler_code: 'DAY',
            day: 15,
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: 13,
            transactor_id: '0b14a04d-9653-40f5-8696-9f0631af75fb',
            scheduler_code: 'DAY',
            day: 19,
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: 14,
            transactor_id: 'ec8d1f38-b521-46fd-9271-a70fd99850fb',
            scheduler_code: 'DAY',
            day: 28,
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: 15,
            transactor_id: '69608c9d-213a-486a-9048-e07ca1bf6e16',
            scheduler_code: 'DAY',
            day: 14,
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: 16,
            transactor_id: '4a0da5eb-8bb9-46fc-9252-d7b4c94375ec',
            scheduler_code: 'DAY',
            day: 4,
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: 17,
            transactor_id: '61c6dc20-63b2-42d8-8b6b-2c8eca102753',
            scheduler_code: 'DAY',
            day: 2,
            created_on: new Date(),
            updated_on: new Date(),
        },
    ]);
};
