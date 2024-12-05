// Custom logger that handles React className warnings with template literals
const createCustomLogger = () => {
  // Store original console methods
  const originalConsole = {
    // log: console.log,
    error: console.error,
    // warn: console.warn
  };

  // Filter function to handle React className warnings
  const filterReactWarnings = (args) => {
    // Check if we have the specific warning pattern
    // First argument is usually the template literal
    // Second argument is 'class'
    // Third argument is 'className'
    return !(args.length >= 3 &&
      args[0].includes('Invalid DOM property `%s`. Did you mean `%s`?') &&
      args[1] === 'class' &&
      args[2] === 'className');
  };

  // Custom console methods
  // console.log = (...args) => {
  //   if (filterReactWarnings(args)) {
  //     originalConsole.log.apply(console, args);
  //   }
  // };

  console.error = (...args) => {
    if (filterReactWarnings(args)) {
      originalConsole.error.apply(console, args);
    }
  };

  // console.warn = (...args) => {
  //   if (filterReactWarnings(args)) {
  //     originalConsole.warn.apply(console, args);
  //   }
  // };

  // Return function to restore original console
  return () => {
    // console.log = originalConsole.log;
    console.error = originalConsole.error;
    // console.warn = originalConsole.warn;
  };
};

export default createCustomLogger;
