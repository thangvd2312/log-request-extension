const CURRENT_DOMAIN = "online.mbbank.com.vn";
let infoAuth = "";

function populateAuthData(authInfo) {
  const authDataContainer = document.getElementById("authData");
  const { body, headers } = authInfo;
  authDataContainer.innerHTML = "";

  const row = document.createElement("tr");

  row.innerHTML = `
    <td class="bodyData">${JSON.stringify(body)}</td>
    <td class="requestHeader">${JSON.stringify(headers)}</td>
  `;
  authDataContainer.appendChild(row);
}

function parseTime(timeStr) {
  const [time, period] = timeStr.split(" ");
  const [hours, minutes, seconds] = time.split(":");

  let hour = parseInt(hours);
  if (period === "PM" && hour !== 12) {
    hour += 12;
  } else if (period === "AM" && hour === 12) {
    hour = 0;
  }

  const today = new Date();
  today.setHours(hour, parseInt(minutes), parseInt(seconds));
  return today;
}

const getStorageData = (key) =>
  new Promise((resolve) =>
    chrome.storage.local.get(key, (data) => resolve(data[key] || []))
  );

const mergeRequests = async () => {
  try {
    const [requests, requestsHeader] = await Promise.all([
      getStorageData("requests"),
      getStorageData("requestsHeader"),
    ]);

    const seenUrls = new Set();
    const requestPost = requests.filter((elm) => {
      const { url, queryParams, postData } = elm;
      return (
        url.includes(CURRENT_DOMAIN) &&
        (queryParams || postData) &&
        !queryParams?.includes("v=") &&
        !seenUrls.has(url) &&
        seenUrls.add(url)
      );
    });

    const requestMerge = requestPost.map((elm) => {
      const findHeader = requestsHeader.find(
        (item) => elm.method === item.method && elm.url === item.url
      );
      if (findHeader)
        elm = { ...elm, requestsHeader: findHeader.requestsHeader };
      return elm;
    });
    const requestMergePost = requestMerge.reduce((latest, current) => {
      if (!latest) return current;

      const latestTime = parseTime(latest.time);
      const currentTime = parseTime(current.time);

      return currentTime > latestTime ? current : latest;
    }, null);
    const postData = JSON.parse(requestMergePost.postData) ?? "";
    const headers = requestMergePost?.requestsHeader ?? [];
    infoAuth = { ...infoAuth, body: postData, headers };
    populateAuthData(infoAuth);
    return requestMerge;
  } catch (err) {}
};

// mergeRequests();

document.addEventListener("DOMContentLoaded", function () {
  mergeRequests();
});
