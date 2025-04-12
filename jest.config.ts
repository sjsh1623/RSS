import { pathsToModuleNameMapper } from 'ts-jest';
import tsconfig from './tsconfig.json';

export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    globals: {
        'ts-jest': {
            tsconfig: './tsconfig.json',
        },
    },
    moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
        prefix: '<rootDir>/',
    }),
};