import '@testing-library/jest-dom'

jest.useFakeTimers({
    // Explicitly tell Jest not to affect the "queueMicrotask" calls.
    doNotFake: ['queueMicrotask'],
})

const originalConsoleError = console.error.bind(console)

console.error = (...args) => {
    // Suppress propTypes warnings
    if (args[0] === 'Warning: Failed %s type: %s%s' && args[1] === 'prop') {
        return
    }

    // Call the original console.error for other warnings
    originalConsoleError(...args)
}
