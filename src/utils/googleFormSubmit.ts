
/**
 * Utility function to submit data to a Google Form
 * Form ID: 1FAIpQLSducP1DKZGe6rY0e4z1M-xnH_prQVRTDEaf4DRMjEURWwDKWg
 */

// Extract actual entry IDs from the Google Form
// These are examples - you need to inspect the actual Google Form HTML to get the correct IDs
const GOOGLE_FORM_FIELD_IDS: Record<string, string> = {
  name: "entry.2005620554",      // Replace with actual entry ID for name field
  email: "entry.1045781291",     // Replace with actual entry ID for email field
  phone: "entry.1166974658",     // Replace with actual entry ID for phone field
  city: "entry.1065046570",      // Replace with actual entry ID for city field
  preference: "entry.839337160"  // Replace with actual entry ID for preference field
};

// Google Form submission URL
const GOOGLE_FORM_URL = 
  "https://docs.google.com/forms/d/e/1FAIpQLSducP1DKZGe6rY0e4z1M-xnH_prQVRTDEaf4DRMjEURWwDKWg/formResponse";

interface FormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  preference: string;
  consent?: boolean;
}

/**
 * Submits form data to Google Form using fetch API
 * This method avoids page navigation issues
 */
export const submitToGoogleForm = async (data: FormData): Promise<boolean> => {
  try {
    // Create FormData object
    const formData = new FormData();
    
    // Add form fields
    Object.entries(data).forEach(([key, value]) => {
      if (GOOGLE_FORM_FIELD_IDS[key]) {
        formData.append(
          GOOGLE_FORM_FIELD_IDS[key], 
          typeof value === "boolean" ? value.toString() : value
        );
      }
    });

    // Use fetch with no-cors mode to submit the form
    // Note: This will always return an opaque response that cannot be read
    // but it will successfully submit the form without redirecting
    const response = await fetch(GOOGLE_FORM_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    });
    
    // Since we're using no-cors, we can't directly check if it was successful
    // We just assume it worked if no error was thrown
    console.log("Google Form submission attempt completed");
    return true;
  } catch (error) {
    console.error("Error submitting to Google Form:", error);
    return false;
  }
};
