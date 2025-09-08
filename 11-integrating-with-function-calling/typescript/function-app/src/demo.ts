import * as dotenv from "dotenv";

dotenv.config();

// Demo version that showcases the function calling app without requiring API keys
console.log("🚀 === Function Calling App Demo ===");
console.log("This is the LAST and most advanced app project in the Generative AI for Beginners course!\n");

console.log("📋 App Overview:");
console.log("- Integrates Azure OpenAI with custom function calling");
console.log("- Demonstrates weather lookup using Bing Maps API");
console.log("- Shows advanced AI capabilities with external data sources\n");

// Mock function that simulates the real findWeather function
async function findWeatherDemo(currentLocation: string, placeType: string): Promise<any> {
  console.log(`🔍 Calling Bing Maps API for: ${currentLocation} (${placeType})`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock weather data response
  const mockWeatherData = {
    location: currentLocation,
    temperature: placeType === "C" ? "22°C" : "72°F",
    condition: "Partly cloudy",
    humidity: "65%",
    windSpeed: "8 km/h",
    timestamp: new Date().toISOString()
  };
  
  console.log("✅ Weather data retrieved successfully!");
  return mockWeatherData;
}

// Function definition that would be sent to Azure OpenAI
const getCurrentWeatherFunction = {
  name: "findWeather",
  description: "Get the current weather in a given location",
  parameters: {
    type: "object",
    properties: {
      location: {
        type: "string",
        description: "The city and state, e.g. San Francisco, CA"
      },
      unit: {
        type: "string",
        enum: ["C", "F"], // Celsius or Fahrenheit
      },
    },
    required: ["location"],
  },
};

// Mock OpenAI response that simulates function calling
function mockOpenAIResponse(userQuery: string, location: string, unit: string) {
  return {
    choices: [{
      message: {
        role: "assistant",
        content: null,
        functionCall: {
          name: "findWeather",
          arguments: JSON.stringify({
            location: location,
            unit: unit
          })
        }
      }
    }]
  };
}

async function demonstrateFunctionCalling() {
  console.log("🎯 Function Calling Demonstration:");
  console.log("==================================\n");
  
  // User parameters
  const userParams = { 
    location: "New York", 
    unit: "C" 
  };
  
  const userQuery = `What's the weather in ${userParams.location}, ${userParams.unit}?`;
  console.log(`👤 User Query: "${userQuery}"`);
  
  console.log("\n🧠 AI Processing:");
  console.log("- Azure OpenAI receives the query");
  console.log("- AI recognizes this needs the findWeather function");
  console.log("- Function definition sent to AI:");
  console.log(JSON.stringify(getCurrentWeatherFunction, null, 2));
  
  console.log("\n⚡ Function Call Triggered:");
  
  // Simulate OpenAI response with function call
  const aiResponse = mockOpenAIResponse(userQuery, userParams.location, userParams.unit);
  
  if (aiResponse.choices[0].message?.functionCall) {
    const { arguments: argumentsJson } = aiResponse.choices[0].message.functionCall;
    const { location, unit } = JSON.parse(argumentsJson);
    
    console.log(`📡 Function: ${aiResponse.choices[0].message.functionCall.name}`);
    console.log(`📝 Arguments: ${argumentsJson}`);
    
    // Execute the weather function
    console.log("\n🌤️  Executing Weather Lookup:");
    const weatherResult = await findWeatherDemo(location, unit);
    
    console.log("\n📊 Weather Result:");
    console.log("==================");
    console.log(`📍 Location: ${weatherResult.location}`);
    console.log(`🌡️  Temperature: ${weatherResult.temperature}`);
    console.log(`☁️  Condition: ${weatherResult.condition}`);
    console.log(`💧 Humidity: ${weatherResult.humidity}`);
    console.log(`💨 Wind Speed: ${weatherResult.windSpeed}`);
    console.log(`⏰ Updated: ${weatherResult.timestamp}`);
    
    console.log("\n✨ Final AI Response:");
    console.log(`"The current weather in ${location} is ${weatherResult.temperature} with ${weatherResult.condition.toLowerCase()} conditions. The humidity is ${weatherResult.humidity} and wind speed is ${weatherResult.windSpeed}."`);
  }
}

async function showTechnicalDetails() {
  console.log("\n\n🔧 Technical Implementation Details:");
  console.log("====================================");
  
  console.log("\n📦 Key Dependencies:");
  console.log("- @azure/openai: ^1.0.0-beta.10");
  console.log("- axios: ^1.8.2");
  console.log("- dotenv: ^16.3.1");
  console.log("- TypeScript: ^5.3.3");
  
  console.log("\n🌐 APIs Integrated:");
  console.log("- Azure OpenAI Service (GPT-4)");
  console.log("- Bing Maps Local Search API");
  
  console.log("\n⚙️  Core Features:");
  console.log("- Function calling with structured parameters");
  console.log("- External API integration");
  console.log("- Error handling and validation");
  console.log("- Environment configuration");
  console.log("- TypeScript type safety");
  
  console.log("\n🏗️  Architecture Pattern:");
  console.log("- Modular function definitions");
  console.log("- Async/await pattern");
  console.log("- Configuration through environment variables");
  console.log("- Clean separation of concerns");
}

async function main() {
  try {
    await demonstrateFunctionCalling();
    await showTechnicalDetails();
    
    console.log("\n\n🎉 Demo Complete!");
    console.log("=================");
    console.log("This function calling app represents the most advanced generative AI");
    console.log("application in the course, showcasing:");
    console.log("✅ Integration with external APIs");
    console.log("✅ Structured function calling");
    console.log("✅ Real-world data enrichment");
    console.log("✅ Production-ready architecture");
    
    console.log("\n📚 To run the actual app:");
    console.log("1. Set up Azure OpenAI and Bing Maps API keys");
    console.log("2. Configure .env file with your credentials");
    console.log("3. Run: npm start");
    
  } catch (error) {
    console.error("❌ Demo encountered an error:", error);
  }
}

// Run the demo
main();