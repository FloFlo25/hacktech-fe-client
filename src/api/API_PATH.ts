export const API_BASE_PATH = "https://magnetic-wombat-centrally.ngrok-free.app";

const path = (route) => `${API_BASE_PATH}/api/${route}`;

export const API_PATHS = {
	// Original endpoints - untouched
	voice: API_BASE_PATH + "/api/analyze-voice",
	image: API_BASE_PATH + "/api/analyze-image",
	text: API_BASE_PATH + "/api/analyze-text",
	survey: API_BASE_PATH + "/api/survey",

	// Super simplified user/form endpoints
	users: (userId, formId) => ({
		base: path("users"),
		id: userId ? path(`users/${userId}`) : null,
		forms: formId
			? path(`users/${userId}/forms/${formId}`)
			: path(`users/${userId}/forms`),
		submit: formId ? path(`users/${userId}/forms/${formId}/submit`) : null,
		responses: formId
			? path(`users/${userId}/forms/${formId}/responses`)
			: null,
	}),

	forms: (formId) => ({
		base: path("forms"),
		id: formId ? path(`forms/${formId}`) : null,
		submit: formId ? path(`forms/${formId}/submit`) : null,
		responses: formId ? path(`forms/${formId}/responses`) : null,
	}),
};

// Usage:
// API_PATHS.users().base                -> /api/users
// API_PATHS.users('123').id             -> /api/users/123
// API_PATHS.users('123').forms          -> /api/users/123/forms
// API_PATHS.users('123', '456').forms   -> /api/users/123/forms/456
// API_PATHS.users('123', '456').submit  -> /api/users/123/forms/456/submit
// API_PATHS.forms('456').id             -> /api/forms/456
