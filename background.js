const requestHeadersMap = new Map();

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    const { method, url, requestBody } = details;
    let data = {
      time: new Date().toLocaleTimeString(),
      url,
      method,
      queryParams: "",
      postData: "",
    };

    if (method !== "POST") {
      return;
    }

    if (method === "POST" && requestBody) {
      data.postData = requestBody?.formData
        ? JSON.stringify(requestBody.formData)
        : requestBody.raw
        ? String.fromCharCode.apply(
            null,
            new Uint8Array(requestBody.raw[0].bytes)
          )
        : "";
    }

    chrome.storage.local.get("requests", (stored) => {
      const requests = stored.requests || [];
      const existingIndex = requests.findIndex(
        (req) => req.url === data.url && req.method === data.method
      );
      if (existingIndex !== -1) {
        requests[existingIndex] = {
          ...requests[existingIndex],
          ...data,
          time: new Date().toLocaleTimeString(),
        };
      } else {
        requests.push(data);
      }
      chrome.storage.local.set({ requests });
    });
  },
  { urls: ["*://*.online.mbbank.com.vn/*"] },
  ["requestBody"]
);

chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    if (details.tabId !== -1) {
      const headers = details.requestHeaders || [];
      requestHeadersMap.set(details.requestId, {
        url: details.url,
        method: details.method,
        requestsHeader: headers,
      });
    }
  },
  { urls: ["*://*.online.mbbank.com.vn/*"] },
  ["requestHeaders", "extraHeaders"]
);

chrome.webRequest.onCompleted.addListener(
  (details) => {
    const data = requestHeadersMap.get(details.requestId);
    if (data) {
      chrome.storage.local.get({ requestsHeader: [] }, (result) => {
        const updatedRequests = [...result.requestsHeader, data];
        chrome.storage.local.set({ requestsHeader: updatedRequests });
      });
      requestHeadersMap.delete(details.requestId);
    }
  },
  { urls: ["*://*.online.mbbank.com.vn/*"] }
);
