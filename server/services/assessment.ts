import { FormValues, HealthResult } from "@shared/schema";

const DIET_PLANS = {
  LOW_RISK: [
    { time: "Morning", meal: "Dalia (broken wheat) porridge with milk and a little jaggery. 1 boiled egg." },
    { time: "Afternoon", meal: "Khichdi (rice and moong dal) with ghee, mashed carrots, and spinach. Curd on the side." },
    { time: "Evening", meal: "Mashed banana or papaya. Ragi (finger millet) malt." },
    { time: "Night", meal: "Soft roti (if age appropriate) or mashed rice with thick dal and seasonal vegetable curry." }
  ],
  MODERATE_RISK: [
    { time: "Morning", meal: "Sprouted moong dal cheela (pancake) or Poha with groundnuts and peas. Glass of milk." },
    { time: "Afternoon", meal: "Rice with mixed vegetable sambar (extra dal) and a seasonal fruit like Mango or Guava." },
    { time: "Evening", meal: "Roasted chana (chickpeas) and a small piece of Jaggery. Lemon water." },
    { time: "Night", meal: "Vegetable Pulav with soybean chunks for protein and a bowl of curd." }
  ],
  HIGH_RISK: [
    { time: "Morning", meal: "High-protein Ragi porridge with milk and crushed nuts. 1 full boiled egg." },
    { time: "Afternoon", meal: "Thick Dal Khichdi with double ghee/oil. Mashed potato and green leafy vegetables." },
    { time: "Evening", meal: "Banana shake with honey or peanut butter. Steamed sweet potato." },
    { time: "Night", meal: "Mashed rice with Fish curry or Paneer/Soya. Ensure the meal is semi-solid and easy to digest." }
  ]
};

export function calculateHealthResult(data: FormValues): HealthResult {
  let riskLevel = "Low";
  let riskColor = "bg-green-100 text-green-800 border-green-200";
  let dietPlan = DIET_PLANS.LOW_RISK;

  if (data.weight < data.age * 2 + 5 || data.meals < 3) {
    riskLevel = "Moderate";
    riskColor = "bg-yellow-100 text-yellow-800 border-yellow-200";
    dietPlan = DIET_PLANS.MODERATE_RISK;
  }
  
  if (data.weight < data.age * 1.5 + 4 || (data.income === "Low" && data.meals < 2)) {
    riskLevel = "High";
    riskColor = "bg-red-100 text-red-800 border-red-200";
    dietPlan = DIET_PLANS.HIGH_RISK;
  }

  const riskInterpretation = riskLevel === "High" 
    ? `Based on the data for ${data.name}, the child is significantly undernourished for their age and height. Immediate nutritional intervention is required to prevent developmental delays.` 
    : riskLevel === "Moderate" 
      ? `${data.name} is showing mild signs of undernutrition. A diet adjustment is needed to ensure they reach their healthy growth curve.` 
      : `${data.name} is currently within a healthy growth range. Keep up the good work and maintain a balanced diet.`;

  const schemes = data.income === "Low" ? [
    "POSHAN Abhiyaan (National Nutrition Mission): Provides supplementary nutrition.",
    "Anganwadi Services: Enroll the child at the nearest Anganwadi center for free daily hot cooked meals and take-home rations (THR)."
  ] : [];

  return {
    name: data.name,
    risk: riskLevel,
    riskColor,
    riskInterpretation,
    dietPlan,
    healthSteps: [
      "Ensure meals are calorie-dense by adding a spoonful of ghee or oil.",
      "Introduce dark green leafy vegetables at least 3 times a week.",
      "Give Iron and Folic Acid (IFA) syrup as prescribed by the local ASHA worker."
    ],
    schemes,
    hygiene: "Wash hands with soap before every meal and after using the toilet. Boil drinking water or use a safe water source to prevent infections that cause weight loss.",
    monitoring: riskLevel === "High" 
      ? "Weekly weight check-ups at the local Anganwadi center until the child reaches the 'Green' safe zone." 
      : "Monthly weight and height check-ups at the local health center.",
    motivation: "Every small healthy bite helps your child grow stronger and brighter. You are doing a wonderful job, and the community is here to support you!"
  };
}
