function mockDependencies() {
    jest.mock('winston', () => ({
        format: {
            colorize: jest.fn(),
            combine: jest.fn(),
            label: jest.fn(),
            timestamp: jest.fn(),
            printf: jest.fn(),
            simple: jest.fn(),
        },
        createLogger: jest.fn().mockReturnValue({
            debug: jest.fn(),
            log: jest.fn(),
        }),
        transports: {
            Console: jest.fn(),
        },
    }));
}

mockDependencies();