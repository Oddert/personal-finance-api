/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/* eslint-disable quotes */
const dayjs = require('dayjs');
const { v4: uuid } = require('uuid');
const customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.extend(customParseFormat);

/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    await knex('transaction').del();
    await knex('transaction').insert([
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .valueOf(),
            ), // '2024-10-31'
            transaction_type: 'DEB',
            description: 'TESCO STORES 619',
            debit: 28.2,
            credit: 0,
            ballance: 1011.34,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .valueOf(),
            ), // '2024-10-31'
            transaction_type: 'DEB',
            description: 'AMZNMktplace - dog treats',
            debit: 16.99,
            credit: 0,
            ballance: 1039.54,
            currency: 'GBP',
            category_id: '348a943b-1b9c-4d92-a6a4-15d3693cba72',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 29, 'day')
                    .valueOf(),
            ), // '2024-10-29'
            transaction_type: 'DEB',
            description: 'Tea shop',
            debit: 15.5,
            credit: 0,
            ballance: 1056.53,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 29, 'day')
                    .valueOf(),
            ), // '2024-10-29'
            transaction_type: 'DEB',
            description: 'TESCO STORES 619',
            debit: 7.15,
            credit: 0,
            ballance: 1072.3,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 28, 'day')
                    .valueOf(),
            ), // '2024-10-28'
            transaction_type: 'DEB',
            description: 'Amazon.co.uk - bathmatt gift for gran',
            debit: 10.98,
            credit: 0,
            ballance: 1079.18,
            currency: 'GBP',
            category_id: 'd90584a7-4c3c-4b0e-8eee-494a16837189',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 28, 'day')
                    .valueOf(),
            ), // '2024-10-28'
            transaction_type: 'DEB',
            description: 'TESCO STORES 6164',
            debit: 19.2,
            credit: 0,
            ballance: 1090.16,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 28, 'day')
                    .valueOf(),
            ), // '2024-10-28'
            transaction_type: 'DEB',
            description: 'Spotify Limited',
            debit: 11.99,
            credit: 0,
            ballance: 1109.36,
            currency: 'GBP',
            category_id: '7364d968-1058-48dc-bdbb-c8268a97bdf5',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 28, 'day')
                    .valueOf(),
            ), // '2024-10-28'
            transaction_type: 'DEB',
            description: 'ARGOS LTD - sd card',
            debit: 10.99,
            credit: 0,
            ballance: 1121.35,
            currency: 'GBP',
            category_id: '0e128ac1-d0be-4009-8fae-89795875199d',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 28, 'day')
                    .valueOf(),
            ), // '2024-10-28'
            transaction_type: 'DEB',
            description: 'CLINTONS 7333',
            debit: 6.25,
            credit: 0,
            ballance: 1132.34,
            currency: 'GBP',
            category_id: 'd90584a7-4c3c-4b0e-8eee-494a16837189',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 28, 'day')
                    .valueOf(),
            ), // '2024-10-28'
            transaction_type: 'DEB',
            description: 'TESCO STORES 619',
            debit: 4.9,
            credit: 0,
            ballance: 1138.59,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 28, 'day')
                    .valueOf(),
            ), // '2024-10-28'
            transaction_type: 'DD',
            description: 'CTAX',
            debit: 65,
            credit: 0,
            ballance: 1143.49,
            currency: 'GBP',
            category_id: '11002146-43f2-45a8-91f8-f718b5f34de3',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 28, 'day')
                    .valueOf(),
            ), // '2024-10-28'
            transaction_type: 'DEB',
            description: 'Garden Centre',
            debit: 56.61,
            credit: 0,
            ballance: 1208.49,
            currency: 'GBP',
            category_id: '59dedd58-2e3e-4615-8e1a-ff82657e3885',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 28, 'day')
                    .valueOf(),
            ), // '2024-10-28'
            transaction_type: 'DEB',
            description: 'Energy bill',
            debit: 110,
            credit: 0,
            ballance: 1265.1,
            currency: 'GBP',
            category_id: '11002146-43f2-45a8-91f8-f718b5f34de3',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 28, 'day')
                    .valueOf(),
            ), // '2024-10-28'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.3,
            credit: 0,
            ballance: 1375.1,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 28, 'day')
                    .valueOf(),
            ), // '2024-10-28'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.1,
            credit: 0,
            ballance: 1377.4,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 28, 'day')
                    .valueOf(),
            ), // '2024-10-28'
            transaction_type: 'DEB',
            description: 'TESCO-STORES-9284',
            debit: 4.35,
            credit: 0,
            ballance: 1379.5,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 28, 'day')
                    .valueOf(),
            ), // '2024-10-28'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.3,
            credit: 0,
            ballance: 1383.85,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 28, 'day')
                    .valueOf(),
            ), // '2024-10-28'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.3,
            credit: 0,
            ballance: 1386.15,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 25, 'day')
                    .valueOf(),
            ), // '2024-10-25'
            transaction_type: 'DEB',
            description: 'TESCO STORES 619',
            debit: 14.9,
            credit: 0,
            ballance: 1388.45,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 25, 'day')
                    .valueOf(),
            ), // '2024-10-25'
            transaction_type: 'DD',
            description: 'SHELTER NAT CAMP',
            debit: 12,
            credit: 0,
            ballance: 1403.35,
            currency: 'GBP',
            category_id: '4b8614e2-4f8d-41e2-8d62-7163eefa6812',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 24, 'day')
                    .valueOf(),
            ), // '2024-10-24'
            transaction_type: 'DEB',
            description: 'TESCO STORES 619',
            debit: 30.4,
            credit: 0,
            ballance: 1415.35,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 24, 'day')
                    .valueOf(),
            ), // '2024-10-24'
            transaction_type: 'DEB',
            description: 'Amazon.co.uk - special shampo (to try out)',
            debit: 20.6,
            credit: 0,
            ballance: 1445.75,
            currency: 'GBP',
            category_id: '1c82556b-ba33-4e91-ab68-3ace780d4452',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 23, 'day')
                    .valueOf(),
            ), // '2024-10-23'
            transaction_type: 'DEB',
            description: 'TESCO STORES 6257',
            debit: 12.95,
            credit: 0,
            ballance: 1466.35,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 23, 'day')
                    .valueOf(),
            ), // '2024-10-23'
            transaction_type: 'DEB',
            description: 'Bee Network Busses',
            debit: 2.85,
            credit: 0,
            ballance: 1479.3,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 23, 'day')
                    .valueOf(),
            ), // '2024-10-23'
            transaction_type: 'DEB',
            description: 'Bee Network Busses',
            debit: 2.35,
            credit: 0,
            ballance: 1482.15,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 23, 'day')
                    .valueOf(),
            ), // '2024-10-23'
            transaction_type: 'DEB',
            description: 'Bee Network Busses',
            debit: 0.4,
            credit: 0,
            ballance: 1484.5,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 22, 'day')
                    .valueOf(),
            ), // '2024-10-22'
            transaction_type: 'DEB',
            description: 'SAINSBURYS S/MKTS',
            debit: 5.9,
            credit: 0,
            ballance: 1484.9,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 22, 'day')
                    .valueOf(),
            ), // '2024-10-22'
            transaction_type: 'DD',
            description: 'SKY INTERNET AND BROA',
            debit: 53.29,
            credit: 0,
            ballance: 1490.8,
            currency: 'GBP',
            category_id: '11002146-43f2-45a8-91f8-f718b5f34de3',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 21, 'day')
                    .valueOf(),
            ), // '2024-10-21'
            transaction_type: 'DEB',
            description: 'SHELTER TRADING LT - boots',
            debit: 30,
            credit: 0,
            ballance: 1544.9,
            currency: 'GBP',
            category_id: '34346c5a-c67c-40e5-bf23-ed8ad127af40',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 21, 'day')
                    .valueOf(),
            ), // '2024-10-21'
            transaction_type: 'DEB',
            description: 'OXFAM F3360 - sidetable',
            debit: 22.98,
            credit: 0,
            ballance: 1574.9,
            currency: 'GBP',
            category_id: '0e128ac1-d0be-4009-8fae-89795875199d',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 21, 'day')
                    .valueOf(),
            ), // '2024-10-21'
            transaction_type: 'DEB',
            description: 'TESCO STORES 619',
            debit: 21.6,
            credit: 0,
            ballance: 1597.7,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 21, 'day')
                    .valueOf(),
            ), // '2024-10-21'
            transaction_type: 'DEB',
            description: 'CANCER RESEARCH LT - gift novelty spice mixer J&T',
            debit: 14,
            credit: 0,
            ballance: 1618.67,
            currency: 'GBP',
            category_id: 'd90584a7-4c3c-4b0e-8eee-494a16837189',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 21, 'day')
                    .valueOf(),
            ), // '2024-10-21'
            transaction_type: 'DEB',
            description: 'AMZNMktplace - folders',
            debit: 12.9,
            credit: 0,
            ballance: 1632.67,
            currency: 'GBP',
            category_id: 'edd2e45e-9812-4f7c-bed3-8076af572b1a',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 21, 'day')
                    .valueOf(),
            ), // '2024-10-21'
            transaction_type: 'DEB',
            description: 'COSTA COFFEE 43077',
            debit: 11.24,
            credit: 0,
            ballance: 1645.57,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 21, 'day')
                    .valueOf(),
            ), // '2024-10-21'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 1.95,
            credit: 0,
            ballance: 1656.81,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 21, 'day')
                    .valueOf(),
            ), // '2024-10-21'
            transaction_type: 'DEB',
            description: 'CO-OP GROUP',
            debit: 1.75,
            credit: 0,
            ballance: 1658.76,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 21, 'day')
                    .valueOf(),
            ), // '2024-10-21'
            transaction_type: 'DEB',
            description: 'SAINSBURYS S/MKTS',
            debit: 0.7,
            credit: 0,
            ballance: 1660.51,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 21, 'day')
                    .valueOf(),
            ), // '2024-10-21'
            transaction_type: 'DD',
            description: 'Mortgage',
            debit: 600,
            credit: 0,
            ballance: 1661.21,
            currency: 'GBP',
            category_id: '14d16a6e-56e1-41f3-aa45-dbbdf2ccb972',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 21, 'day')
                    .valueOf(),
            ), // '2024-10-21'
            transaction_type: 'DEB',
            description: 'AMZNMktplace - box set gift for tom',
            debit: 17.99,
            credit: 0,
            ballance: 2261.21,
            currency: 'GBP',
            category_id: 'd90584a7-4c3c-4b0e-8eee-494a16837189',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 21, 'day')
                    .valueOf(),
            ), // '2024-10-21'
            transaction_type: 'DEB',
            description: 'TESCO-STORES-6060',
            debit: 11.2,
            credit: 0,
            ballance: 2279.2,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 21, 'day')
                    .valueOf(),
            ), // '2024-10-21'
            transaction_type: 'DEB',
            description: 'Parks Services Cafe',
            debit: 6,
            credit: 0,
            ballance: 2290.4,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 21, 'day')
                    .valueOf(),
            ), // '2024-10-21'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.3,
            credit: 0,
            ballance: 2296.4,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 21, 'day')
                    .valueOf(),
            ), // '2024-10-21'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.1,
            credit: 0,
            ballance: 2298.7,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 21, 'day')
                    .valueOf(),
            ), // '2024-10-21'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.3,
            credit: 0,
            ballance: 2300.8,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 21, 'day')
                    .valueOf(),
            ), // '2024-10-21'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.3,
            credit: 0,
            ballance: 2303.1,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 18, 'day')
                    .valueOf(),
            ), // '2024-10-18'
            transaction_type: 'DEB',
            description: 'AMZNMktplace - toilet valve',
            debit: 4.19,
            credit: 0,
            ballance: 2305.4,
            currency: 'GBP',
            category_id: '0e128ac1-d0be-4009-8fae-89795875199d',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 18, 'day')
                    .valueOf(),
            ), // '2024-10-18'
            transaction_type: 'BGC',
            description: 'PAYROL',
            debit: 0,
            credit: 1987.35,
            ballance: 2309.59,
            currency: 'GBP',
            category_id: '8ca3ae7e-1dc8-4e76-ad1e-ba6518a18778',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 16, 'day')
                    .valueOf(),
            ), // '2024-10-16'
            transaction_type: 'DEB',
            description: 'TESCO STORES 619',
            debit: 9.5,
            credit: 0,
            ballance: 322.24,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 16, 'day')
                    .valueOf(),
            ), // '2024-10-16'
            transaction_type: 'DEB',
            description: 'LIDL GB LONDON',
            debit: 6.69,
            credit: 0,
            ballance: 331.74,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 15, 'day')
                    .valueOf(),
            ), // '2024-10-15'
            transaction_type: 'DEB',
            description: 'NON-GBP PURCH FEE',
            debit: 0.5,
            credit: 0,
            ballance: 338.43,
            currency: 'GBP',
            category_id: '4b8614e2-4f8d-41e2-8d62-7163eefa6812',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 15, 'day')
                    .valueOf(),
            ), // '2024-10-15'
            transaction_type: 'DEB',
            description: 'NON-GBP TRANS FEE',
            debit: 0.11,
            credit: 0,
            ballance: 338.93,
            currency: 'GBP',
            category_id: '4b8614e2-4f8d-41e2-8d62-7163eefa6812',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 15, 'day')
                    .valueOf(),
            ), // '2024-10-15'
            transaction_type: 'DEB',
            description: 'FREECODECAMP.ORG',
            debit: 3.83,
            credit: 0,
            ballance: 339.4,
            currency: 'GBP',
            category_id: '4b8614e2-4f8d-41e2-8d62-7163eefa6812',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 15, 'day')
                    .valueOf(),
            ), // '2024-10-15'
            transaction_type: 'DD',
            description: 'SKY INTERNET AND BROA',
            debit: 53.29,
            credit: 0,
            ballance: 342.87,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 14, 'day')
                    .valueOf(),
            ), // '2024-10-14'
            transaction_type: 'DEB',
            description: 'UBER   *EATS',
            debit: 60.48,
            credit: 0,
            ballance: 396.16,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 14, 'day')
                    .valueOf(),
            ), // '2024-10-14'
            transaction_type: 'DEB',
            description: 'ASDA SUPERSTORE',
            debit: 51.2,
            credit: 0,
            ballance: 456.64,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 14, 'day')
                    .valueOf(),
            ), // '2024-10-14'
            transaction_type: 'DEB',
            description: 'TESCO STORES 619',
            debit: 27.7,
            credit: 0,
            ballance: 507.84,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 14, 'day')
                    .valueOf(),
            ), // '2024-10-14'
            transaction_type: 'DEB',
            description: 'Coop Airdre',
            debit: 13.56,
            credit: 0,
            ballance: 535.54,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 14, 'day')
                    .valueOf(),
            ), // '2024-10-14'
            transaction_type: 'DEB',
            description: 'KELVINGROVE VISA',
            debit: 11.75,
            credit: 0,
            ballance: 549.1,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 14, 'day')
                    .valueOf(),
            ), // '2024-10-14'
            transaction_type: 'DEB',
            description: 'TESCO STORES 619',
            debit: 7.8,
            credit: 0,
            ballance: 560.85,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 14, 'day')
                    .valueOf(),
            ), // '2024-10-14'
            transaction_type: 'DEB',
            description: 'MARIE CURIE (vase for eric)',
            debit: 7,
            credit: 0,
            ballance: 568.65,
            currency: 'GBP',
            category_id: 'd90584a7-4c3c-4b0e-8eee-494a16837189',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 14, 'day')
                    .valueOf(),
            ), // '2024-10-14'
            transaction_type: 'DEB',
            description: 'OXFAM (more trousers)',
            debit: 5.99,
            credit: 0,
            ballance: 575.65,
            currency: 'GBP',
            category_id: '34346c5a-c67c-40e5-bf23-ed8ad127af40',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 14, 'day')
                    .valueOf(),
            ), // '2024-10-14'
            transaction_type: 'DEB',
            description: "BARNARDO'S 95655 (trousters)",
            debit: 4,
            credit: 0,
            ballance: 581.64,
            currency: 'GBP',
            category_id: '34346c5a-c67c-40e5-bf23-ed8ad127af40',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 14, 'day')
                    .valueOf(),
            ), // '2024-10-14'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 3.5,
            credit: 0,
            ballance: 585.64,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 14, 'day')
                    .valueOf(),
            ), // '2024-10-14'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.3,
            credit: 0,
            ballance: 589.14,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 14, 'day')
                    .valueOf(),
            ), // '2024-10-14'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 3.5,
            credit: 0,
            ballance: 591.44,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 14, 'day')
                    .valueOf(),
            ), // '2024-10-14'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 3.5,
            credit: 0,
            ballance: 594.94,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 14, 'day')
                    .valueOf(),
            ), // '2024-10-14'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 0,
            credit: 7.25,
            ballance: 598.44,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 11, 'day')
                    .valueOf(),
            ), // '2024-10-11'
            transaction_type: 'DEB',
            description: 'Dentist - Hygene',
            debit: 40,
            credit: 0,
            ballance: 591.19,
            currency: 'GBP',
            category_id: '2ec895de-e28e-44a1-94d9-f2ded36203cc',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 11, 'day')
                    .valueOf(),
            ), // '2024-10-11'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 18.4,
            credit: 0,
            ballance: 631.19,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 11, 'day')
                    .valueOf(),
            ), // '2024-10-11'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 16,
            credit: 0,
            ballance: 649.59,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 11, 'day')
                    .valueOf(),
            ), // '2024-10-11'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 12.25,
            credit: 0,
            ballance: 665.59,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 11, 'day')
                    .valueOf(),
            ), // '2024-10-11'
            transaction_type: 'DEB',
            description: 'ZETTLE_*PROFESSION (sealant gun)',
            debit: 6.5,
            credit: 0,
            ballance: 677.84,
            currency: 'GBP',
            category_id: '0e128ac1-d0be-4009-8fae-89795875199d',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 11, 'day')
                    .valueOf(),
            ), // '2024-10-11'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 5.7,
            credit: 0,
            ballance: 684.34,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 11, 'day')
                    .valueOf(),
            ), // '2024-10-11'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 4.2,
            credit: 0,
            ballance: 690.4,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 11, 'day')
                    .valueOf(),
            ), // '2024-10-11'
            transaction_type: 'DEB',
            description: 'Bee Network Busses',
            debit: 2,
            credit: 0,
            ballance: 694.24,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 10, 'day')
                    .valueOf(),
            ), // '2024-10-10'
            transaction_type: 'DEB',
            description: 'TESCO STORES 619',
            debit: 9.7,
            credit: 0,
            ballance: 696.24,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 9, 'day')
                    .valueOf(),
            ), // '2024-10-9'
            transaction_type: 'DEB',
            description: 'ASDA SUPERSTORE',
            debit: 12.28,
            credit: 0,
            ballance: 705.94,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 9, 'day')
                    .valueOf(),
            ), // '2024-10-9'
            transaction_type: 'DEB',
            description: 'TESCO STORES 619',
            debit: 5.75,
            credit: 0,
            ballance: 718.22,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 8, 'day')
                    .valueOf(),
            ), // '2024-10-8'
            transaction_type: 'DD',
            description: 'DIRECTLINE INSURANCE',
            debit: 17.4,
            credit: 0,
            ballance: 723.97,
            currency: 'GBP',
            category_id: '11002146-43f2-45a8-91f8-f718b5f34de3',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 7, 'day')
                    .valueOf(),
            ), // '2024-10-7'
            transaction_type: 'DEB',
            description: 'ASDA STORES',
            debit: 60.6,
            credit: 0,
            ballance: 741.1,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 7, 'day')
                    .valueOf(),
            ), // '2024-10-7'
            transaction_type: 'DEB',
            description: 'Coop Airdre',
            debit: 32.34,
            credit: 0,
            ballance: 801.7,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 7, 'day')
                    .valueOf(),
            ), // '2024-10-7'
            transaction_type: 'DEB',
            description: 'CITYBIKE UK Ltd.',
            debit: 2.85,
            credit: 0,
            ballance: 833.41,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 7, 'day')
                    .valueOf(),
            ), // '2024-10-7'
            transaction_type: 'DD',
            description: 'EE',
            debit: 16.2,
            credit: 0,
            ballance: 836.26,
            currency: 'GBP',
            category_id: '7096c6d4-2280-4334-a817-4c2e4ab848e9',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 7, 'day')
                    .valueOf(),
            ), // '2024-10-7'
            transaction_type: 'DD',
            description: 'Dentist',
            debit: 20,
            credit: 0,
            ballance: 852.46,
            currency: 'GBP',
            category_id: '2ec895de-e28e-44a1-94d9-f2ded36203cc',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 7, 'day')
                    .valueOf(),
            ), // '2024-10-7'
            transaction_type: 'DEB',
            description: 'CITYBIKE UK Ltd.',
            debit: 2,
            credit: 0,
            ballance: 872.46,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 7, 'day')
                    .valueOf(),
            ), // '2024-10-7'
            transaction_type: 'DEB',
            description: 'LIDL GB LONDON',
            debit: 7.82,
            credit: 0,
            ballance: 874.46,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 7, 'day')
                    .valueOf(),
            ), // '2024-10-7'
            transaction_type: 'DEB',
            description: 'Catering Offices',
            debit: 5.5,
            credit: 0,
            ballance: 882.28,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 7, 'day')
                    .valueOf(),
            ), // '2024-10-7'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.1,
            credit: 0,
            ballance: 887.78,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 7, 'day')
                    .valueOf(),
            ), // '2024-10-7'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.3,
            credit: 0,
            ballance: 889.88,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 3, 'day')
                    .valueOf(),
            ), // '2024-10-3'
            transaction_type: 'DEB',
            description: 'ASDA STORES',
            debit: 31.43,
            credit: 0,
            ballance: 892.18,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 2, 'day')
                    .valueOf(),
            ), // '2024-10-2'
            transaction_type: 'DEB',
            description: 'TESCO STORES 619',
            debit: 30,
            credit: 0,
            ballance: 923.61,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 2, 'day')
                    .valueOf(),
            ), // '2024-10-2'
            transaction_type: 'DEB',
            description: 'CLOUD LFPGEG',
            debit: 24.17,
            credit: 0,
            ballance: 953.61,
            currency: 'GBP',
            category_id: 'edd2e45e-9812-4f7c-bed3-8076af572b1a',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 2, 'day')
                    .valueOf(),
            ), // '2024-10-2'
            transaction_type: 'DEB',
            description: 'PAYPAL *PATREON  M',
            debit: 6.24,
            credit: 0,
            ballance: 977.78,
            currency: 'GBP',
            category_id: '4b8614e2-4f8d-41e2-8d62-7163eefa6812',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            date: new Date(
                dayjs()
                    .subtract(12 - 10, 'month')
                    .subtract(31 - 1, 'day')
                    .valueOf(),
            ), // '2024-10-1'
            transaction_type: 'DEB',
            description: 'AMZNMktplace - pot set gift for cam',
            debit: 15.98,
            credit: 0,
            ballance: 984.2,
            currency: 'GBP',
            category_id: 'd90584a7-4c3c-4b0e-8eee-494a16837189',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
    ]);
    await knex('transaction').insert([
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 29, 'day')
                    .valueOf(),
            ), // '2024-11-29'
            transaction_type: 'DEB',
            description: 'TESCO STORES 619',
            debit: 36,
            credit: 0,
            ballance: 1061.28,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 28, 'day')
                    .valueOf(),
            ), // '2024-11-28'
            transaction_type: 'DEB',
            description: 'Spotify Limited',
            debit: 11.99,
            credit: 0,
            ballance: 1097.28,
            currency: 'GBP',
            category_id: '7364d968-1058-48dc-bdbb-c8268a97bdf5',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 28, 'day')
                    .valueOf(),
            ), // '2024-11-28'
            transaction_type: 'DD',
            description: 'CTAX',
            debit: 65,
            credit: 0,
            ballance: 1109.27,
            currency: 'GBP',
            category_id: '11002146-43f2-45a8-91f8-f718b5f34de3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 27, 'day')
                    .valueOf(),
            ), // '2024-11-27'
            transaction_type: 'DEB',
            description: 'SAVERS HEALTH & BE (special cleaning stuff)',
            debit: 12.88,
            credit: 0,
            ballance: 1174.27,
            currency: 'GBP',
            category_id: '0e128ac1-d0be-4009-8fae-89795875199d',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 27, 'day')
                    .valueOf(),
            ), // '2024-11-27'
            transaction_type: 'DEB',
            description: 'AMZNMktplace - book',
            debit: 5.59,
            credit: 0,
            ballance: 1187.15,
            currency: 'GBP',
            category_id: '3d84b0a8-f4b2-4464-96ac-43e8babd2156',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 26, 'day')
                    .valueOf(),
            ), // '2024-11-26'
            transaction_type: 'DEB',
            description: 'Coop Airdre',
            debit: 21,
            credit: 0,
            ballance: 1192.74,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 26, 'day')
                    .valueOf(),
            ), // '2024-11-26'
            transaction_type: 'DEB',
            description: 'UBER   *EATS',
            debit: 80.84,
            credit: 0,
            ballance: 1213.74,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 25, 'day')
                    .valueOf(),
            ), // '2024-11-25'
            transaction_type: 'DEB',
            description: 'TESCO STORES 619',
            debit: 35,
            credit: 0,
            ballance: 1294.58,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 25, 'day')
                    .valueOf(),
            ), // '2024-11-25'
            transaction_type: 'DEB',
            description: 'AMZNMktplace - phone stand',
            debit: 15.39,
            credit: 0,
            ballance: 1329.58,
            currency: 'GBP',
            category_id: 'edd2e45e-9812-4f7c-bed3-8076af572b1a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 25, 'day')
                    .valueOf(),
            ), // '2024-11-25'
            transaction_type: 'DD',
            description: 'SHELTER NAT CAMP',
            debit: 12,
            credit: 0,
            ballance: 1344.97,
            currency: 'GBP',
            category_id: '4b8614e2-4f8d-41e2-8d62-7163eefa6812',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 25, 'day')
                    .valueOf(),
            ), // '2024-11-25'
            transaction_type: 'DEB',
            description: 'AMZNMktplace - dog toy',
            debit: 14.99,
            credit: 0,
            ballance: 1356.97,
            currency: 'GBP',
            category_id: '348a943b-1b9c-4d92-a6a4-15d3693cba72',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 25, 'day')
                    .valueOf(),
            ), // '2024-11-25'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.3,
            credit: 0,
            ballance: 1371.96,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 25, 'day')
                    .valueOf(),
            ), // '2024-11-25'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.1,
            credit: 0,
            ballance: 1374.26,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 25, 'day')
                    .valueOf(),
            ), // '2024-11-25'
            transaction_type: 'FPI',
            description: 'MUM - dinner out contribution',
            debit: 0,
            credit: '50',
            ballance: 1376.36,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 25, 'day')
                    .valueOf(),
            ), // '2024-11-25'
            transaction_type: 'DEB',
            description: 'TESCO-STORES-6060',
            debit: 10.2,
            credit: 0,
            ballance: 1326.36,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 25, 'day')
                    .valueOf(),
            ), // '2024-11-25'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.3,
            credit: 0,
            ballance: 1336.56,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 25, 'day')
                    .valueOf(),
            ), // '2024-11-25'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.3,
            credit: 0,
            ballance: 1338.86,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 22, 'day')
                    .valueOf(),
            ), // '2024-11-22'
            transaction_type: 'DD',
            description: 'Energy bill',
            debit: 110,
            credit: 0,
            ballance: 1341.16,
            currency: 'GBP',
            category_id: '11002146-43f2-45a8-91f8-f718b5f34de3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 20, 'day')
                    .valueOf(),
            ), // '2024-11-20'
            transaction_type: 'DEB',
            description: 'TESCO STORES 6257',
            debit: 30.45,
            credit: 0,
            ballance: 1451.16,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 20, 'day')
                    .valueOf(),
            ), // '2024-11-20'
            transaction_type: 'DD',
            description: 'Mortgage',
            debit: 600,
            credit: 0,
            ballance: 1481.61,
            currency: 'GBP',
            category_id: '14d16a6e-56e1-41f3-aa45-dbbdf2ccb972',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 19, 'day')
                    .valueOf(),
            ), // '2024-11-19'
            transaction_type: 'DEB',
            description: 'AMZNMktplace - gift manicure set jamie',
            debit: 15.99,
            credit: 0,
            ballance: 2081.61,
            currency: 'GBP',
            category_id: 'd90584a7-4c3c-4b0e-8eee-494a16837189',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 19, 'day')
                    .valueOf(),
            ), // '2024-11-19'
            transaction_type: 'DEB',
            description: 'TESCO STORES 619',
            debit: 14.55,
            credit: 0,
            ballance: 2097.6,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 19, 'day')
                    .valueOf(),
            ), // '2024-11-19'
            transaction_type: 'DEB',
            description: 'AMAZON - special shampoo',
            debit: 11.45,
            credit: 0,
            ballance: 2112.15,
            currency: 'GBP',
            category_id: '1c82556b-ba33-4e91-ab68-3ace780d4452',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 18, 'day')
                    .valueOf(),
            ), // '2024-11-18'
            transaction_type: 'DEB',
            description: 'AMZNMktplace - pyjamas',
            debit: 17.95,
            credit: 0,
            ballance: 2123.6,
            currency: 'GBP',
            category_id: 'd90584a7-4c3c-4b0e-8eee-494a16837189',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 18, 'day')
                    .valueOf(),
            ), // '2024-11-18'
            transaction_type: 'DEB',
            description: 'LIDL GB WALTHAMSTOW',
            debit: 10.77,
            credit: 0,
            ballance: 2141.55,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 18, 'day')
                    .valueOf(),
            ), // '2024-11-18'
            transaction_type: 'DEB',
            description: 'SAINSBURYS S/MKTS',
            debit: 7.75,
            credit: 0,
            ballance: 2152.32,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 18, 'day')
                    .valueOf(),
            ), // '2024-11-18'
            transaction_type: 'DD',
            description: 'CREDIT CARD',
            debit: 95.5,
            credit: 0,
            ballance: 2160.7,
            currency: 'GBP',
            category_id: '15d150b4-9eb5-42a5-bc36-88420bc4dd0d',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 18, 'day')
                    .valueOf(),
            ), // '2024-11-18'
            transaction_type: 'BGC',
            description: 'PAYROL',
            debit: 0,
            credit: '1987.35',
            ballance: 2255.12,
            currency: 'GBP',
            category_id: '8ca3ae7e-1dc8-4e76-ad1e-ba6518a18778',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 18, 'day')
                    .valueOf(),
            ), // '2024-11-18'
            transaction_type: 'DEB',
            description: 'AMZNMktplace - book gift for james',
            debit: 9.99,
            credit: 0,
            ballance: 267.77,
            currency: 'GBP',
            category_id: 'd90584a7-4c3c-4b0e-8eee-494a16837189',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 18, 'day')
                    .valueOf(),
            ), // '2024-11-18'
            transaction_type: 'DEB',
            description: 'AMZNMktplace - book gift for jessie',
            debit: 9.99,
            credit: 0,
            ballance: 277.76,
            currency: 'GBP',
            category_id: 'd90584a7-4c3c-4b0e-8eee-494a16837189',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 18, 'day')
                    .valueOf(),
            ), // '2024-11-18'
            transaction_type: 'DEB',
            description: '55965 GLASGOW CLA (other cafe at hunterian)',
            debit: 9,
            credit: 0,
            ballance: 287.75,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 18, 'day')
                    .valueOf(),
            ), // '2024-11-18'
            transaction_type: 'DEB',
            description: 'Catering Offices (cafe at hunterian)',
            debit: 6.9,
            credit: 0,
            ballance: 296.75,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 18, 'day')
                    .valueOf(),
            ), // '2024-11-18'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.3,
            credit: 0,
            ballance: 303.65,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 18, 'day')
                    .valueOf(),
            ), // '2024-11-18'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 1.95,
            credit: 0,
            ballance: 305.95,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 18, 'day')
                    .valueOf(),
            ), // '2024-11-18'
            transaction_type: 'DEB',
            description: 'TESCO-STORES-6060',
            debit: 9.95,
            credit: 0,
            ballance: 307.9,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 18, 'day')
                    .valueOf(),
            ), // '2024-11-18'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.3,
            credit: 0,
            ballance: 317.85,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 18, 'day')
                    .valueOf(),
            ), // '2024-11-18'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.3,
            credit: 0,
            ballance: 320.15,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 18, 'day')
                    .valueOf(),
            ), // '2024-11-18'
            transaction_type: 'FPI',
            description: 'BROTHER - joint gift contribution',
            debit: 0,
            credit: '9',
            ballance: 322.45,
            currency: 'GBP',
            category_id: 'd90584a7-4c3c-4b0e-8eee-494a16837189',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 15, 'day')
                    .valueOf(),
            ), // '2024-11-15'
            transaction_type: 'DEB',
            description: 'WEST END CYCLES - bike pump + tire levers',
            debit: 37,
            credit: 0,
            ballance: 313.45,
            currency: 'GBP',
            category_id: '0864b74e-6c5b-416d-a8c3-75d5fa8fb514',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 15, 'day')
                    .valueOf(),
            ), // '2024-11-15'
            transaction_type: 'DEB',
            description: 'Amazon.co.uk - new drill because dad stole mine',
            debit: 36.52,
            credit: 0,
            ballance: 350.45,
            currency: 'GBP',
            category_id: '0e128ac1-d0be-4009-8fae-89795875199d',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 15, 'day')
                    .valueOf(),
            ), // '2024-11-15'
            transaction_type: 'DEB',
            description: 'BOOTS THE CHEMIST',
            debit: 12,
            credit: 0,
            ballance: 386.97,
            currency: 'GBP',
            category_id: '1c82556b-ba33-4e91-ab68-3ace780d4452',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 15, 'day')
                    .valueOf(),
            ), // '2024-11-15'
            transaction_type: 'DEB',
            description: 'AMZNMktplace - mouse traps',
            debit: 8.99,
            credit: 0,
            ballance: 398.97,
            currency: 'GBP',
            category_id: '0e128ac1-d0be-4009-8fae-89795875199d',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 15, 'day')
                    .valueOf(),
            ), // '2024-11-15'
            transaction_type: 'DEB',
            description: 'ARGOS - serving tray',
            debit: 8,
            credit: 0,
            ballance: 407.96,
            currency: 'GBP',
            category_id: '0e128ac1-d0be-4009-8fae-89795875199d',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 15, 'day')
                    .valueOf(),
            ), // '2024-11-15'
            transaction_type: 'DEB',
            description: 'TESCO STORES 619',
            debit: 4,
            credit: 0,
            ballance: 415.96,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 15, 'day')
                    .valueOf(),
            ), // '2024-11-15'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 1.9,
            credit: 0,
            ballance: 419.96,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 15, 'day')
                    .valueOf(),
            ), // '2024-11-15'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 1.85,
            credit: 0,
            ballance: 421.86,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 15, 'day')
                    .valueOf(),
            ), // '2024-11-15'
            transaction_type: 'DD',
            description: 'SKY INTERNET AND BROA',
            debit: 53.29,
            credit: 0,
            ballance: 423.71,
            currency: 'GBP',
            category_id: '11002146-43f2-45a8-91f8-f718b5f34de3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 14, 'day')
                    .valueOf(),
            ), // '2024-11-14'
            transaction_type: 'DEB',
            description: 'TESCO STORES 619',
            debit: 12.9,
            credit: 0,
            ballance: 477,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 14, 'day')
                    .valueOf(),
            ), // '2024-11-14'
            transaction_type: 'DEB',
            description: 'NON-GBP PURCH FEE',
            debit: 0.5,
            credit: 0,
            ballance: 489.9,
            currency: 'GBP',
            category_id: '4b8614e2-4f8d-41e2-8d62-7163eefa6812',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 14, 'day')
                    .valueOf(),
            ), // '2024-11-14'
            transaction_type: 'DEB',
            description: 'NON-GBP TRANS FEE',
            debit: 0.11,
            credit: 0,
            ballance: 490.4,
            currency: 'GBP',
            category_id: '4b8614e2-4f8d-41e2-8d62-7163eefa6812',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 14, 'day')
                    .valueOf(),
            ), // '2024-11-14'
            transaction_type: 'DEB',
            description: 'FREECODECAMP.ORG',
            debit: 3.93,
            credit: 0,
            ballance: 490.51,
            currency: 'GBP',
            category_id: '4b8614e2-4f8d-41e2-8d62-7163eefa6812',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 12, 'day')
                    .valueOf(),
            ), // '2024-11-12'
            transaction_type: 'DEB',
            description: 'Amazon.co.uk - folder organisers',
            debit: 10.11,
            credit: 0,
            ballance: 494.44,
            currency: 'GBP',
            category_id: 'edd2e45e-9812-4f7c-bed3-8076af572b1a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 11, 'day')
                    .valueOf(),
            ), // '2024-11-11'
            transaction_type: 'DEB',
            description: 'AMZNMktplace - plant feed',
            debit: 25.99,
            credit: 0,
            ballance: 504.55,
            currency: 'GBP',
            category_id: '59dedd58-2e3e-4615-8e1a-ff82657e3885',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 11, 'day')
                    .valueOf(),
            ), // '2024-11-11'
            transaction_type: 'DEB',
            description: 'LIDL GB WALTHAMSTOW',
            debit: 22.24,
            credit: 0,
            ballance: 530.54,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 11, 'day')
                    .valueOf(),
            ), // '2024-11-11'
            transaction_type: 'DEB',
            description: 'AMZNMktplace - bike chain lube',
            debit: 13.58,
            credit: 0,
            ballance: 552.78,
            currency: 'GBP',
            category_id: '0864b74e-6c5b-416d-a8c3-75d5fa8fb514',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 11, 'day')
                    .valueOf(),
            ), // '2024-11-11'
            transaction_type: 'DEB',
            description: 'AMZNMktplace - replacement laptop cable',
            debit: 11.99,
            credit: 0,
            ballance: 566.36,
            currency: 'GBP',
            category_id: '0e128ac1-d0be-4009-8fae-89795875199d',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 8, 'day')
                    .valueOf(),
            ), // '2024-11-8'
            transaction_type: 'DEB',
            description: 'Dentist',
            debit: 20,
            credit: 0,
            ballance: 578.35,
            currency: 'GBP',
            category_id: '2ec895de-e28e-44a1-94d9-f2ded36203cc',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 8, 'day')
                    .valueOf(),
            ), // '2024-11-8'
            transaction_type: 'DEB',
            description: 'ALDI STORES',
            debit: 14.26,
            credit: 0,
            ballance: 598.35,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 8, 'day')
                    .valueOf(),
            ), // '2024-11-8'
            transaction_type: 'DEB',
            description: 'TESCO STORES 1234',
            debit: 3.3,
            credit: 0,
            ballance: 612.61,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 8, 'day')
                    .valueOf(),
            ), // '2024-11-8'
            transaction_type: 'DD',
            description: 'SUE RYDER - lampshade',
            debit: 10,
            credit: 0,
            ballance: 615.91,
            currency: 'GBP',
            category_id: 'd90584a7-4c3c-4b0e-8eee-494a16837189',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 7, 'day')
                    .valueOf(),
            ), // '2024-11-7'
            transaction_type: 'DEB',
            description: 'Godady UK (new website replacement)',
            debit: 57.31,
            credit: 0,
            ballance: 625.91,
            currency: 'GBP',
            category_id: 'edd2e45e-9812-4f7c-bed3-8076af572b1a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 6, 'day')
                    .valueOf(),
            ), // '2024-11-6'
            transaction_type: 'DEB',
            description: 'ALDI STORES',
            debit: 7.5,
            credit: 0,
            ballance: 683.22,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 6, 'day')
                    .valueOf(),
            ), // '2024-11-6'
            transaction_type: 'FPO',
            description: 'MUM - eat out food contribution',
            debit: 35,
            credit: 0,
            ballance: 690.72,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 6, 'day')
                    .valueOf(),
            ), // '2024-11-6'
            transaction_type: 'DD',
            description: 'EE',
            debit: 16.2,
            credit: 0,
            ballance: 725.72,
            currency: 'GBP',
            category_id: '11002146-43f2-45a8-91f8-f718b5f34de3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 5, 'day')
                    .valueOf(),
            ), // '2024-11-5'
            transaction_type: 'DEB',
            description: 'LIDL GB LONDON',
            debit: 11.74,
            credit: 0,
            ballance: 741.92,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 5, 'day')
                    .valueOf(),
            ), // '2024-11-5'
            transaction_type: 'DD',
            description: 'Dentist',
            debit: 20,
            credit: 0,
            ballance: 753.66,
            currency: 'GBP',
            category_id: '2ec895de-e28e-44a1-94d9-f2ded36203cc',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 4, 'day')
                    .valueOf(),
            ), // '2024-11-4'
            transaction_type: 'DEB',
            description: 'AMZNMktplace - steam cleaner',
            debit: 121.59,
            credit: 0,
            ballance: 773.66,
            currency: 'GBP',
            category_id: '0e128ac1-d0be-4009-8fae-89795875199d',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 4, 'day')
                    .valueOf(),
            ), // '2024-11-4'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.3,
            credit: 0,
            ballance: 895.25,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 4, 'day')
                    .valueOf(),
            ), // '2024-11-4'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.1,
            credit: 0,
            ballance: 897.55,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 4, 'day')
                    .valueOf(),
            ), // '2024-11-4'
            transaction_type: 'DD',
            description: 'DIRECTLINE INSURANCE',
            debit: 17.4,
            credit: 0,
            ballance: 899.65,
            currency: 'GBP',
            category_id: '11002146-43f2-45a8-91f8-f718b5f34de3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 4, 'day')
                    .valueOf(),
            ), // '2024-11-4'
            transaction_type: 'DEB',
            description:
                'SHAW TRUST - various gifts gloves, scarf, novelty jigsaw',
            debit: 42,
            credit: 0,
            ballance: 916.69,
            currency: 'GBP',
            category_id: 'd90584a7-4c3c-4b0e-8eee-494a16837189',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 4, 'day')
                    .valueOf(),
            ), // '2024-11-4'
            transaction_type: 'DEB',
            description: 'LIDL GB GLASGOW',
            debit: 8.94,
            credit: 0,
            ballance: 958.69,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 4, 'day')
                    .valueOf(),
            ), // '2024-11-4'
            transaction_type: 'DEB',
            description: 'RIVERSIDE VISA',
            debit: 8.9,
            credit: 0,
            ballance: 967.63,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 4, 'day')
                    .valueOf(),
            ), // '2024-11-4'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.3,
            credit: 0,
            ballance: 976.53,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 4, 'day')
                    .valueOf(),
            ), // '2024-11-4'
            transaction_type: 'DEB',
            description: 'PAYPAL *PATREON  M',
            debit: 6.55,
            credit: 0,
            ballance: 978.83,
            currency: 'GBP',
            category_id: '4b8614e2-4f8d-41e2-8d62-7163eefa6812',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 4, 'day')
                    .valueOf(),
            ), // '2024-11-4'
            transaction_type: 'DEB',
            description: 'CLOUD LFPGEG',
            debit: 21.36,
            credit: 0,
            ballance: 985.38,
            currency: 'GBP',
            category_id: 'edd2e45e-9812-4f7c-bed3-8076af572b1a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 4, 'day')
                    .valueOf(),
            ), // '2024-11-4'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.3,
            credit: 0,
            ballance: 1006.74,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(12 - 11, 'month')
                    .subtract(31 - 4, 'day')
                    .valueOf(),
            ), // '2024-11-4'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.3,
            credit: 0,
            ballance: 1009.4,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
    ]);
    await knex('transaction').insert([
        {
            date: new Date(dayjs().valueOf()), // '2024-12-31'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.3,
            credit: 0,
            ballance: 1013.4,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 30, 'day')
                    .valueOf(),
            ), // '2024-12-30'
            transaction_type: 'DD',
            description: 'CTAX',
            debit: 65,
            credit: 0,
            ballance: 1015.7,
            currency: 'GBP',
            category_id: '11002146-43f2-45a8-91f8-f718b5f34de3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 30, 'day')
                    .valueOf(),
            ), // '2024-12-30'
            transaction_type: 'DEB',
            description: 'CEX LTD - new Pokemon game',
            debit: 42.95,
            credit: 0,
            ballance: 1080.7,
            currency: 'GBP',
            category_id: '3d84b0a8-f4b2-4464-96ac-43e8babd2156',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 30, 'day')
                    .valueOf(),
            ), // '2024-12-30'
            transaction_type: 'DEB',
            description: 'Spotify Limited',
            debit: 11.99,
            credit: 0,
            ballance: 1123.65,
            currency: 'GBP',
            category_id: '7364d968-1058-48dc-bdbb-c8268a97bdf5',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 27, 'day')
                    .valueOf(),
            ), // '2024-12-27'
            transaction_type: 'DD',
            description: 'SHELTER NAT CAMP',
            debit: 12,
            credit: 0,
            ballance: 1135.64,
            currency: 'GBP',
            category_id: '4b8614e2-4f8d-41e2-8d62-7163eefa6812',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 27, 'day')
                    .valueOf(),
            ), // '2024-12-27'
            transaction_type: 'DEB',
            description: 'TESCO STORES 5678',
            debit: 28.79,
            credit: 0,
            ballance: 1147.64,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 27, 'day')
                    .valueOf(),
            ), // '2024-12-27'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.3,
            credit: 0,
            ballance: 1176.43,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 24, 'day')
                    .valueOf(),
            ), // '2024-12-24'
            transaction_type: 'DEB',
            description: 'TESCO STORES 9876',
            debit: 31.8,
            credit: 0,
            ballance: 1178.73,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 24, 'day')
                    .valueOf(),
            ), // '2024-12-24'
            transaction_type: 'DEB',
            description: 'Coop Airdre',
            debit: 18.71,
            credit: 0,
            ballance: 1210.53,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 23, 'day')
                    .valueOf(),
            ), // '2024-12-23'
            transaction_type: 'DEB',
            description: 'ASDA STORES',
            debit: 63.33,
            credit: 0,
            ballance: 1229.24,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 23, 'day')
                    .valueOf(),
            ), // '2024-12-23'
            transaction_type: 'DEB',
            description: 'AMZNMktplace - dvd set for cousin',
            debit: 32.99,
            credit: 0,
            ballance: 1292.57,
            currency: 'GBP',
            category_id: 'd90584a7-4c3c-4b0e-8eee-494a16837189',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 23, 'day')
                    .valueOf(),
            ), // '2024-12-23'
            transaction_type: 'DD',
            description: 'Energy bill',
            debit: 110,
            credit: 0,
            ballance: 1325.56,
            currency: 'GBP',
            category_id: '11002146-43f2-45a8-91f8-f718b5f34de3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 23, 'day')
                    .valueOf(),
            ), // '2024-12-23'
            transaction_type: 'DEB',
            description: 'LIDL GB LONDON',
            debit: 36.2,
            credit: 0,
            ballance: 1435.56,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 23, 'day')
                    .valueOf(),
            ), // '2024-12-23'
            transaction_type: 'DEB',
            description: 'OXFAM',
            debit: 9.28,
            credit: 0,
            ballance: 1471.76,
            currency: 'GBP',
            category_id: 'd90584a7-4c3c-4b0e-8eee-494a16837189',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 23, 'day')
                    .valueOf(),
            ), // '2024-12-23'
            transaction_type: 'DEB',
            description: 'UBER   *ONE',
            debit: 4.99,
            credit: 0,
            ballance: 1481.4,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 23, 'day')
                    .valueOf(),
            ), // '2024-12-23'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.3,
            credit: 0,
            ballance: 1486.3,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 23, 'day')
                    .valueOf(),
            ), // '2024-12-23'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.1,
            credit: 0,
            ballance: 1488.33,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 23, 'day')
                    .valueOf(),
            ), // '2024-12-23'
            transaction_type: 'DEB',
            description: 'WAITROSE 619',
            debit: 16,
            credit: 0,
            ballance: 1490.43,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 23, 'day')
                    .valueOf(),
            ), // '2024-12-23'
            transaction_type: 'DEB',
            description: 'Amazon.co.uk - shirt folder for dad',
            debit: 11.59,
            credit: 0,
            ballance: 1506.43,
            currency: 'GBP',
            category_id: 'd90584a7-4c3c-4b0e-8eee-494a16837189',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 23, 'day')
                    .valueOf(),
            ), // '2024-12-23'
            transaction_type: 'DEB',
            description: 'PETS AT HOME LTD',
            debit: 10.39,
            credit: 0,
            ballance: 1518.2,
            currency: 'GBP',
            category_id: 'd90584a7-4c3c-4b0e-8eee-494a16837189',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 23, 'day')
                    .valueOf(),
            ), // '2024-12-23'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.3,
            credit: 0,
            ballance: 1528.41,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 23, 'day')
                    .valueOf(),
            ), // '2024-12-23'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.3,
            credit: 0,
            ballance: 1530.71,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 23, 'day')
                    .valueOf(),
            ), // '2024-12-23'
            transaction_type: 'FPI',
            description: 'Brother - money for joint gift for mum',
            debit: 0,
            credit: '12.99',
            ballance: 1533.1,
            currency: 'GBP',
            category_id: 'd90584a7-4c3c-4b0e-8eee-494a16837189',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 20, 'day')
                    .valueOf(),
            ), // '2024-12-20'
            transaction_type: 'DEB',
            description: 'TESCO STORES 6789',
            debit: 14.15,
            credit: 0,
            ballance: 1520.2,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 20, 'day')
                    .valueOf(),
            ), // '2024-12-20'
            transaction_type: 'DD',
            description: 'Mortgage',
            debit: 600,
            credit: 0,
            ballance: 1534.17,
            currency: 'GBP',
            category_id: '14d16a6e-56e1-41f3-aa45-dbbdf2ccb972',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 19, 'day')
                    .valueOf(),
            ), // '2024-12-19'
            transaction_type: 'DEB',
            description: 'LS THE GOOD SPIRIT - whikey gift for dad',
            debit: 41.5,
            credit: 0,
            ballance: 2134.17,
            currency: 'GBP',
            category_id: 'd90584a7-4c3c-4b0e-8eee-494a16837189',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 19, 'day')
                    .valueOf(),
            ), // '2024-12-19'
            transaction_type: 'DEB',
            description: 'GREGGS - gift card for gareth',
            debit: 20,
            credit: 0,
            ballance: 2175.67,
            currency: 'GBP',
            category_id: 'd90584a7-4c3c-4b0e-8eee-494a16837189',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 19, 'day')
                    .valueOf(),
            ), // '2024-12-19'
            transaction_type: 'DEB',
            description: 'OXFAM - various gardening',
            debit: 19.27,
            credit: 0,
            ballance: 2195.67,
            currency: 'GBP',
            category_id: '59dedd58-2e3e-4615-8e1a-ff82657e3885',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 19, 'day')
                    .valueOf(),
            ), // '2024-12-19'
            transaction_type: 'DEB',
            description: 'AMZNMktplace - lego model for cousin 2',
            debit: 17.8,
            credit: 0,
            ballance: 2214.94,
            currency: 'GBP',
            category_id: 'd90584a7-4c3c-4b0e-8eee-494a16837189',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 19, 'day')
                    .valueOf(),
            ), // '2024-12-19'
            transaction_type: 'DEB',
            description: 'AMZNMktplace - book for gran',
            debit: 4.95,
            credit: 0,
            ballance: 2232.2,
            currency: 'GBP',
            category_id: 'd90584a7-4c3c-4b0e-8eee-494a16837189',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 19, 'day')
                    .valueOf(),
            ), // '2024-12-19'
            transaction_type: 'DEB',
            description: 'BOOTS/619',
            debit: 4.36,
            credit: 0,
            ballance: 2236.97,
            currency: 'GBP',
            category_id: '1c82556b-ba33-4e91-ab68-3ace780d4452',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 18, 'day')
                    .valueOf(),
            ), // '2024-12-18'
            transaction_type: 'DEB',
            description: 'SAINSBURYS SMKTS',
            debit: 14.15,
            credit: 0,
            ballance: 2241.33,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 18, 'day')
                    .valueOf(),
            ), // '2024-12-18'
            transaction_type: 'FPI',
            description: 'MUM - joint gift for uncle selwyn',
            debit: 0,
            credit: '37',
            ballance: 2255.48,
            currency: 'GBP',
            category_id: 'd90584a7-4c3c-4b0e-8eee-494a16837189',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 18, 'day')
                    .valueOf(),
            ), // '2024-12-18'
            transaction_type: 'BGC',
            description: 'PAYROL',
            debit: 0,
            credit: '1987.35',
            ballance: 2218.48,
            currency: 'GBP',
            category_id: '8ca3ae7e-1dc8-4e76-ad1e-ba6518a18778',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 17, 'day')
                    .valueOf(),
            ), // '2024-12-17'
            transaction_type: 'DEB',
            description: 'AMAZON MKTPL - new bike tires',
            debit: 20.81,
            credit: 0,
            ballance: 231.13,
            currency: 'GBP',
            category_id: '0864b74e-6c5b-416d-a8c3-75d5fa8fb514',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 17, 'day')
                    .valueOf(),
            ), // '2024-12-17'
            transaction_type: 'DEB',
            description: 'TESCO STORES 619',
            debit: 45.75,
            credit: 0,
            ballance: 251.94,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 16, 'day')
                    .valueOf(),
            ), // '2024-12-16'
            transaction_type: 'DEB',
            description: 'Amazon.co.uk - replacement vacum cleaner filter',
            debit: 11.95,
            credit: 0,
            ballance: 297.69,
            currency: 'GBP',
            category_id: '0e128ac1-d0be-4009-8fae-89795875199d',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 16, 'day')
                    .valueOf(),
            ), // '2024-12-16'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.3,
            credit: 0,
            ballance: 309.64,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 16, 'day')
                    .valueOf(),
            ), // '2024-12-16'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.3,
            credit: 0,
            ballance: 311.94,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 16, 'day')
                    .valueOf(),
            ), // '2024-12-16'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.3,
            credit: 0,
            ballance: 314.24,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 16, 'day')
                    .valueOf(),
            ), // '2024-12-16'
            transaction_type: 'DD',
            description: 'SKY INTERNET AND BROA',
            debit: 53.29,
            credit: 0,
            ballance: 316.54,
            currency: 'GBP',
            category_id: '11002146-43f2-45a8-91f8-f718b5f34de3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 16, 'day')
                    .valueOf(),
            ), // '2024-12-16'
            transaction_type: 'DEB',
            description: 'Amazon.co.uk - gift lamp for grandpa',
            debit: 20.22,
            credit: 0,
            ballance: 369.83,
            currency: 'GBP',
            category_id: 'd90584a7-4c3c-4b0e-8eee-494a16837189',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 16, 'day')
                    .valueOf(),
            ), // '2024-12-16'
            transaction_type: 'DEB',
            description: 'PARK SERVICES CAFE',
            debit: 14.5,
            credit: 0,
            ballance: 390.5,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 16, 'day')
                    .valueOf(),
            ), // '2024-12-16'
            transaction_type: 'DEB',
            description: 'AMAZON MKTPL - gift  keychain for andy',
            debit: 14.32,
            credit: 0,
            ballance: 404.55,
            currency: 'GBP',
            category_id: 'd90584a7-4c3c-4b0e-8eee-494a16837189',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 16, 'day')
                    .valueOf(),
            ), // '2024-12-16'
            transaction_type: 'DEB',
            description: 'PARK SERVICES CAFE',
            debit: 9.45,
            credit: 0,
            ballance: 418.87,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 16, 'day')
                    .valueOf(),
            ), // '2024-12-16'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.1,
            credit: 0,
            ballance: 428.32,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 16, 'day')
                    .valueOf(),
            ), // '2024-12-16'
            transaction_type: 'FPO',
            description: 'MUM - joint gift for Remus',
            debit: 30,
            credit: 0,
            ballance: 430.42,
            currency: 'GBP',
            category_id: 'd90584a7-4c3c-4b0e-8eee-494a16837189',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 16, 'day')
                    .valueOf(),
            ), // '2024-12-16'
            transaction_type: 'DEB',
            description: "Hotel D'halgo",
            debit: 13.2,
            credit: 0,
            ballance: 460.42,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 16, 'day')
                    .valueOf(),
            ), // '2024-12-16'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 10.65,
            credit: 0,
            ballance: 473.62,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 16, 'day')
                    .valueOf(),
            ), // '2024-12-16'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 10.65,
            credit: 0,
            ballance: 484.27,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 16, 'day')
                    .valueOf(),
            ), // '2024-12-16'
            transaction_type: 'DEB',
            description: 'NON-GBP PURCH FEE',
            debit: 0.5,
            credit: 0,
            ballance: 494.92,
            currency: 'GBP',
            category_id: '4b8614e2-4f8d-41e2-8d62-7163eefa6812',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 16, 'day')
                    .valueOf(),
            ), // '2024-12-16'
            transaction_type: 'DEB',
            description: 'NON-GBP TRANS FEE',
            debit: 0.11,
            credit: 0,
            ballance: 495.42,
            currency: 'GBP',
            category_id: '4b8614e2-4f8d-41e2-8d62-7163eefa6812',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 16, 'day')
                    .valueOf(),
            ), // '2024-12-16'
            transaction_type: 'DEB',
            description: 'FREECODECAMP.ORG',
            debit: 3.95,
            credit: 0,
            ballance: 495.53,
            currency: 'GBP',
            category_id: '4b8614e2-4f8d-41e2-8d62-7163eefa6812',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 16, 'day')
                    .valueOf(),
            ), // '2024-12-16'
            transaction_type: 'DEB',
            description: 'BOOTS 619 (floss)',
            debit: 2.4,
            credit: 0,
            ballance: 499.48,
            currency: 'GBP',
            category_id: '1c82556b-ba33-4e91-ab68-3ace780d4452',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 11, 'day')
                    .valueOf(),
            ), // '2024-12-11'
            transaction_type: 'DEB',
            description: 'TESCO STORES 6789',
            debit: 21.88,
            credit: 0,
            ballance: 501.88,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 10, 'day')
                    .valueOf(),
            ), // '2024-12-10'
            transaction_type: 'DEB',
            description: 'TESCO STORES 6789',
            debit: 11.2,
            credit: 0,
            ballance: 523.76,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 9, 'day')
                    .valueOf(),
            ), // '2024-12-9'
            transaction_type: 'DEB',
            description: 'ASDA SUPERSTORE',
            debit: 52.95,
            credit: 0,
            ballance: 534.96,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 9, 'day')
                    .valueOf(),
            ), // '2024-12-9'
            transaction_type: 'DEB',
            description: 'Coop Airdre',
            debit: 35.72,
            credit: 0,
            ballance: 587.91,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 9, 'day')
                    .valueOf(),
            ), // '2024-12-9'
            transaction_type: 'DEB',
            description: 'AMZNMktplace - the expanse seson 4',
            debit: 12.8,
            credit: 0,
            ballance: 623.63,
            currency: 'GBP',
            category_id: '59dedd58-2e3e-4615-8e1a-ff82657e3885',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 9, 'day')
                    .valueOf(),
            ), // '2024-12-9'
            transaction_type: 'DD',
            description: 'SUE RYDER DONATE',
            debit: 10,
            credit: 0,
            ballance: 636.43,
            currency: 'GBP',
            category_id: '4b8614e2-4f8d-41e2-8d62-7163eefa6812',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 9, 'day')
                    .valueOf(),
            ), // '2024-12-9'
            transaction_type: 'DEB',
            description: 'AMZNMktplace - dog treats',
            debit: 10.99,
            credit: 0,
            ballance: 646.43,
            currency: 'GBP',
            category_id: '348a943b-1b9c-4d92-a6a4-15d3693cba72',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 9, 'day')
                    .valueOf(),
            ), // '2024-12-9'
            transaction_type: 'DEB',
            description: 'CASS ART',
            debit: 25.2,
            credit: 0,
            ballance: 657.42,
            currency: 'GBP',
            category_id: '59dedd58-2e3e-4615-8e1a-ff82657e3885',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 9, 'day')
                    .valueOf(),
            ), // '2024-12-9'
            transaction_type: 'DEB',
            description: 'OXFAM - gift rug for laura',
            debit: 11.97,
            credit: 0,
            ballance: 682.62,
            currency: 'GBP',
            category_id: 'd90584a7-4c3c-4b0e-8eee-494a16837189',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 9, 'day')
                    .valueOf(),
            ), // '2024-12-9'
            transaction_type: 'DEB',
            description: "BARNARDO'S 2931 - better coat",
            debit: 10,
            credit: 0,
            ballance: 694.59,
            currency: 'GBP',
            category_id: '34346c5a-c67c-40e5-bf23-ed8ad127af40',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 9, 'day')
                    .valueOf(),
            ), // '2024-12-9'
            transaction_type: 'DEB',
            description: 'MUSEUM CAFE VISA',
            debit: 4.45,
            credit: 0,
            ballance: 704.59,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 9, 'day')
                    .valueOf(),
            ), // '2024-12-9'
            transaction_type: 'DEB',
            description: 'MUSEUM CAFE VISA',
            debit: 3.2,
            credit: 0,
            ballance: 709.4,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 9, 'day')
                    .valueOf(),
            ), // '2024-12-9'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.3,
            credit: 0,
            ballance: 712.24,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 9, 'day')
                    .valueOf(),
            ), // '2024-12-9'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.1,
            credit: 0,
            ballance: 714.54,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 9, 'day')
                    .valueOf(),
            ), // '2024-12-9'
            transaction_type: 'DEB',
            description: 'Amazon.co.uk - photoframe for erin',
            debit: 29.99,
            credit: 0,
            ballance: 716.64,
            currency: 'GBP',
            category_id: 'd90584a7-4c3c-4b0e-8eee-494a16837189',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 9, 'day')
                    .valueOf(),
            ), // '2024-12-9'
            transaction_type: 'DEB',
            description: 'Thompson Morgan - seeds for new year',
            debit: 18.98,
            credit: 0,
            ballance: 746.63,
            currency: 'GBP',
            category_id: '59dedd58-2e3e-4615-8e1a-ff82657e3885',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 9, 'day')
                    .valueOf(),
            ), // '2024-12-9'
            transaction_type: 'DEB',
            description: 'AMAZON - movie',
            debit: 9.99,
            credit: 0,
            ballance: 765.61,
            currency: 'GBP',
            category_id: '3d84b0a8-f4b2-4464-96ac-43e8babd2156',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 9, 'day')
                    .valueOf(),
            ), // '2024-12-9'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.3,
            credit: 0,
            ballance: 775.6,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 9, 'day')
                    .valueOf(),
            ), // '2024-12-9'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.3,
            credit: 0,
            ballance: 777.9,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 6, 'day')
                    .valueOf(),
            ), // '2024-12-6'
            transaction_type: 'DEB',
            description: 'Dentist',
            debit: 20,
            credit: 0,
            ballance: 780.2,
            currency: 'GBP',
            category_id: '2ec895de-e28e-44a1-94d9-f2ded36203cc',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 6, 'day')
                    .valueOf(),
            ), // '2024-12-6'
            transaction_type: 'DEB',
            description:
                'BRITISH RED CROSS - joint gift tea-set with campbell for emma',
            debit: 18,
            credit: 0,
            ballance: 800.2,
            currency: 'GBP',
            category_id: 'd90584a7-4c3c-4b0e-8eee-494a16837189',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 6, 'day')
                    .valueOf(),
            ), // '2024-12-6'
            transaction_type: 'DEB',
            description: 'BRITISH RED CROSS - mug',
            debit: 2,
            credit: 0,
            ballance: 818.2,
            currency: 'GBP',
            category_id: 'd90584a7-4c3c-4b0e-8eee-494a16837189',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 5, 'day')
                    .valueOf(),
            ), // '2024-12-5'
            transaction_type: 'DEB',
            description: 'ALDI STORES',
            debit: 24.77,
            credit: 0,
            ballance: 820.2,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 5, 'day')
                    .valueOf(),
            ), // '2024-12-5'
            transaction_type: 'DEB',
            description: 'ALDI STORES',
            debit: 24.59,
            credit: 0,
            ballance: 844.97,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 5, 'day')
                    .valueOf(),
            ), // '2024-12-5'
            transaction_type: 'DEB',
            description: 'SUE RYDER 7766 - puzzel book gift aunt gertrude',
            debit: 22.2,
            credit: 0,
            ballance: 869.56,
            currency: 'GBP',
            category_id: 'd90584a7-4c3c-4b0e-8eee-494a16837189',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 5, 'day')
                    .valueOf(),
            ), // '2024-12-5'
            transaction_type: 'DD',
            description: 'EE',
            debit: 16.2,
            credit: 0,
            ballance: 891.76,
            currency: 'GBP',
            category_id: '7096c6d4-2280-4334-a817-4c2e4ab848e9',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 4, 'day')
                    .valueOf(),
            ), // '2024-12-4'
            transaction_type: 'DEB',
            description: 'Coop Airdre',
            debit: 6.5,
            credit: 0,
            ballance: 907.96,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 3, 'day')
                    .valueOf(),
            ), // '2024-12-3'
            transaction_type: 'DEB',
            description: 'MARKS&SPENCER PLC',
            debit: 17.6,
            credit: 0,
            ballance: 914.1,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 3, 'day')
                    .valueOf(),
            ), // '2024-12-3'
            transaction_type: 'DEB',
            description: 'Coop Airdre',
            debit: 13.27,
            credit: 0,
            ballance: 931.61,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 2, 'day')
                    .valueOf(),
            ), // '2024-12-2'
            transaction_type: 'DEB',
            description: 'TESCO-STORES-5678',
            debit: 19,
            credit: 0,
            ballance: 944.88,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 2, 'day')
                    .valueOf(),
            ), // '2024-12-2'
            transaction_type: 'DEB',
            description: 'PAYPAL *PATREON  M',
            debit: 6.78,
            credit: 0,
            ballance: 963.88,
            currency: 'GBP',
            category_id: '4b8614e2-4f8d-41e2-8d62-7163eefa6812',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 2, 'day')
                    .valueOf(),
            ), // '2024-12-2'
            transaction_type: 'DEB',
            description: 'Coop Airdre',
            debit: 11.46,
            credit: 0,
            ballance: 970.66,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 2, 'day')
                    .valueOf(),
            ), // '2024-12-2'
            transaction_type: 'DEB',
            description: 'CLOUD LFPGEG',
            debit: 0.89,
            credit: 0,
            ballance: 982.12,
            currency: 'GBP',
            category_id: 'edd2e45e-9812-4f7c-bed3-8076af572b1a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 2, 'day')
                    .valueOf(),
            ), // '2024-12-2'
            transaction_type: 'DD',
            description: 'Home Insurance',
            debit: 15.78,
            credit: 0,
            ballance: 983.1,
            currency: 'GBP',
            category_id: '11002146-43f2-45a8-91f8-f718b5f34de3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 2, 'day')
                    .valueOf(),
            ), // '2024-12-2'
            transaction_type: 'DD',
            description: 'DIRECTLINE INSURANCE',
            debit: 17.4,
            credit: 0,
            ballance: 998.79,
            currency: 'GBP',
            category_id: '11002146-43f2-45a8-91f8-f718b5f34de3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 2, 'day')
                    .valueOf(),
            ), // '2024-12-2'
            transaction_type: 'DEB',
            description: 'Parks Services Cafe',
            debit: 11.75,
            credit: 0,
            ballance: 1015.83,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 2, 'day')
                    .valueOf(),
            ), // '2024-12-2'
            transaction_type: 'DEB',
            description: "BARNARDO'S 55966",
            debit: 9,
            credit: 0,
            ballance: 1027.58,
            currency: 'GBP',
            category_id: 'd90584a7-4c3c-4b0e-8eee-494a16837189',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 2, 'day')
                    .valueOf(),
            ), // '2024-12-2'
            transaction_type: 'DEB',
            description: 'TESCO-STORES-1234',
            debit: 6.4,
            credit: 0,
            ballance: 1036.58,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 2, 'day')
                    .valueOf(),
            ), // '2024-12-2'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.3,
            credit: 0,
            ballance: 1042.98,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 2, 'day')
                    .valueOf(),
            ), // '2024-12-2'
            transaction_type: 'DEB',
            description: 'NorthernRail',
            debit: 2.1,
            credit: 0,
            ballance: 1045.28,
            currency: 'GBP',
            category_id: 'b6945bdd-04b6-4df9-9530-1e1a9ce273c3',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
        {
            date: new Date(
                dayjs()
                    .subtract(31 - 2, 'day')
                    .valueOf(),
            ), // '2024-12-2'
            transaction_type: 'DEB',
            description: 'TESCO-STORES-1234',
            debit: 13.9,
            credit: 0,
            ballance: 1047.38,
            currency: 'GBP',
            category_id: '486f9685-cc57-45f4-a2e7-fc505840de6a',
            id: uuid(),
            user_id: 'dc4b572d-1be4-412f-b99a-4cc947e9f048',
            card_id: 'be913800-df3b-4285-803a-88e971fde8f3',
            created_on: new Date(),
            updated_on: new Date(),
        },
    ]);
};
