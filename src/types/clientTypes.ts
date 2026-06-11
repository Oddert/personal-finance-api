export interface IClientScheduler {
    createdOn: string | null;
    day?: number;
    id: string;
    nthDay?: number;
    schedulerCode: string;
    step?: number;
    startDate?: string;
    transactorId: string;
    updatedOn: string | null;
}

export interface IClientTransactor {
    categoryId: string;
    createdOn: string | null;
    description: string | null;
    id: string;
    isAddition: boolean;
    scenarioId: string;
    schedulers?: IClientScheduler[];
    updatedOn: string | null;
    value: number;
}

export interface IClientScenario {
    cardId: string;
    createdOn: string | null;
    description: string;
    endDate: string | null;
    id: string;
    startDate: string | null;
    startBallance: number;
    title: string;
    userId: string;
    updatedOn: string | null;
    transactors?: IClientTransactor[];
}
