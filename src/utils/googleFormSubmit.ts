
/**
 * Utility function to submit data to a Google Form
 * Form ID: 1FAIpQLSducP1DKZGe6rY0e4z1M-xnH_prQVRTDEaf4DRMjEURWwDKWg
 */

// Map of form field names to Google Form entry IDs
// These IDs need to be extracted from the actual Google Form
const GOOGLE_FORM_FIELD_IDS: Record<string, string> = {
  name: "entry.1234567890",      // Replace with actual entry ID for name field
  email: "entry.1234567891",     // Replace with actual entry ID for email field
  phone: "entry.1234567892",     // Replace with actual entry ID for phone field
  city: "entry.1234567893",      // Replace with actual entry ID for city field
  preference: "entry.1234567894" // Replace with actual entry ID for preference field
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
 * Submits form data to Google Form
 * 
 * Note: Due to CORS restrictions, this will use a hidden iframe approach
 * which doesn't return success/failure status but allows submission without redirects
 */
export const submitToGoogleForm = (data: FormData): Promise<boolean> => {
  return new Promise((resolve) => {
    try {
      // Create a form element
      const form = document.createElement("form");
      form.method = "POST";
      form.action = GOOGLE_FORM_URL;
      form.target = "hidden-iframe";
      form.style.display = "none";

      // Add form fields
      Object.entries(data).forEach(([key, value]) => {
        if (GOOGLE_FORM_FIELD_IDS[key]) {
          const input = document.createElement("input");
          input.type = "text";
          input.name = GOOGLE_FORM_FIELD_IDS[key];
          input.value = typeof value === "boolean" ? value.toString() : value;
          form.appendChild(input);
        }
      });

      // Create hidden iframe to target form submission
      const iframe = document.createElement("iframe");
      iframe.name = "hidden-iframe";
      iframe.style.display = "none";
      
      // Add iframe and form to DOM
      document.body.appendChild(iframe);
      document.body.appendChild(form);

      // Submit form after short delay to ensure iframe is loaded
      setTimeout(() => {
        form.submit();
        
        // Clean up after submission
        setTimeout(() => {
          document.body.removeChild(form);
          document.body.removeChild(iframe);
          
          // We assume success since we can't actually check with this method
          // due to CORS restrictions
          resolve(true);
        }, 1000);
      }, 100);
    } catch (error) {
      console.error("Error submitting to Google Form:", error);
      resolve(false);
    }
  });
};
