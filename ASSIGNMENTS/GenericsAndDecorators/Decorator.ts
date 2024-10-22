function Logger(constructor: Function) {
    console.log(`Class ${constructor.name} was instantiated`);
}

function LogExecutionTime(descriptor: PropertyDescriptor,target?: any, methodName?: string): void {
    const originalMethod = descriptor.value;

    // Replace the original method with a new function
    descriptor.value = async function (...args: any[]) { 
        const start = performance.now();
        try {
            const result = await originalMethod.apply(this, args);
            const end = performance.now();
            console.log(`Execution time for ${methodName}: ${end - start} ms`);
            return result;
        } catch (error) {
            console.error(`Error in method ${methodName}:`, error);
            throw error; // Re-throw the error after logging
        }
    };
}

@Logger
class Person {
    constructor(public name: string) {}

    @LogExecutionTime
    async get(name: string) {
        const ApiUrl = `https://api.example.com/${name}`; // Example URL
        const response = await fetch(ApiUrl);
        
        if (!response.ok) { // Check for HTTP errors
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Call json() method correctly
        return data;
    }
}

// Example usage
(async () => {
    const person = new Person('John Doe');
    try {
        const result = await person.get('example');
        console.log('Fetched data:', result);
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
})();
