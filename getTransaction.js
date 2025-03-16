document.addEventListener("DOMContentLoaded", function () {
  const fromDate = document.getElementById("fromDate");
  const toDate = document.getElementById("toDate");

  const today = new Date();

  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);

  const formattedToday = today.toISOString().split("T")[0];
  const formattedLastWeek = lastWeek.toISOString().split("T")[0];

  fromDate.value = formattedLastWeek;
  toDate.value = formattedToday;
  fromDate.max = formattedToday;
  toDate.max = formattedToday;

  fromDate.addEventListener("change", function () {
    toDate.min = fromDate.value;
  });
  toDate.addEventListener("change", function () {
    fromDate.max = toDate.value;
  });

  const transactionBtn = document.getElementById("transactionBtn");

  transactionBtn.addEventListener("click", getTransaction);
});

function formatDateForApi(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

function displayTransactions(result) {
  const tbody = document.getElementById("transactionData");
  tbody.innerHTML = "";

  result.forEach((transaction) => {
    const row = document.createElement("tr");

    let transactionType;
    let amount;

    if (transaction.creditAmount !== "0") {
      transactionType = "Nhận tiền";
      amount = transaction.creditAmount;
    } else {
      transactionType = "Chuyển tiền";
      amount = `-${transaction.debitAmount}`;
    }

    const formattedAmount = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: transaction.currency,
    }).format(amount);

    row.innerHTML = `
          <td>${transaction.transactionDate}</td>
          <td class="${
            parseFloat(amount) >= 0 ? "amount-positive" : "amount-negative"
          }">
              ${formattedAmount}
              <br>
              <small class="transaction-type ${
                parseFloat(amount) >= 0 ? "type-receive" : "type-send"
              }">
                  ${transactionType}
              </small>
          </td>
          <td>${transaction.refNo}</td>
          <td>${transaction.description}</td>
          <td>${transaction.benAccountName || ""}</td>
          <td>${transaction.benAccountNo || ""}</td>
          <td>${transaction.bankName || ""}</td>
      `;

    tbody.appendChild(row);
  });
}

function getTransaction() {
  const fromDateInput = document.getElementById("fromDate");
  const toDateInput = document.getElementById("toDate");
  const accountNo = document.getElementById("accountNo").value;

  const fromDate = formatDateForApi(fromDateInput.value);
  const toDate = formatDateForApi(toDateInput.value);

  const baseBody = JSON.parse(document.querySelector("td.bodyData").innerText);
  const requestHeader = JSON.parse(
    document.querySelector("td.requestHeader").innerText
  );

  const myHeaders = new Headers();
  requestHeader.forEach((header) => {
    myHeaders.append(header.name, header.value);
  });
  const rawData = {
    ...baseBody,
    fromDate,
    toDate,
    accountNo,
  };

  // muốn get accountNo, get https://online.mbbank.com.vn/api/retail-web-accountms/getBalance
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(rawData),
    redirect: "follow",
  };

  fetch(
    "https://online.mbbank.com.vn/api/retail-transactionms/transactionms/get-account-transaction-history",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      const transactions = JSON.parse(result).transactionHistoryList ?? [];

      displayTransactions(transactions);
    })
    .catch((error) => console.error(error));
}
