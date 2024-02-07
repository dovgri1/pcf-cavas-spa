import {
  PublicClientApplication,
  InteractionRequiredAuthError,
  AccountInfo,
  AuthenticationResult,
} from "@azure/msal-browser";

interface MSALConfig {
  auth: {
    clientId: string;
    authority: string;
  };
}

interface LoginRequest {
  scopes: string[];
  account?: AccountInfo;
}

// Function to login and acquire token via popup
export async function signInAndGetToken(
  dataverseEnvironmentUri: string,
  applicationId: string,
  tenantId: string
): Promise<string> {
  const msalConfig: MSALConfig = {
    auth: {
      clientId: applicationId,
      authority:
        "https://login.microsoftonline.com/" + tenantId,
    },
  };

  const msalInstance: PublicClientApplication = new PublicClientApplication(
    msalConfig
  );

  const loginRequest: LoginRequest = {
    scopes: [dataverseEnvironmentUri + "/.default"], // Your required scopes
  };
  await msalInstance.initialize();
  try {
    // Check for existing accounts
    const accounts: AccountInfo[] = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      msalInstance.setActiveAccount(accounts[0]);
      loginRequest.account = accounts[0];
    } else {
      // Perform login to set an account
      const loginResponse: AuthenticationResult = await msalInstance.loginPopup(
        loginRequest
      );
      msalInstance.setActiveAccount(loginResponse.account);
      loginRequest.account = loginResponse.account;
    }

    const response: AuthenticationResult =
      await msalInstance.acquireTokenSilent(loginRequest);
    return response.accessToken;
  } catch (error) {
    console.error(error);
    // Fallback to interaction when silent acquisition fails
    if (error instanceof InteractionRequiredAuthError) {
      try {
        const response: AuthenticationResult =
          await msalInstance.acquireTokenPopup(loginRequest);
        return response.accessToken;
      } catch (err) {
        console.error(err);
        throw err;
      }
    } else {
      throw error;
    }
  }
}
