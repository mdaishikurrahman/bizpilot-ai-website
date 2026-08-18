/* =========================================================
   BIZPILOT AI — INVOICES
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const searchInput =
        document.getElementById("invoiceSearch");

    const statusFilter =
        document.getElementById("invoiceStatusFilter");

    const tableBody =
        document.getElementById("invoiceTableBody");

    const emptyState =
        document.getElementById("invoiceEmptyState");

    const createInvoiceBtn =
        document.getElementById("createInvoiceBtn");


    /* =====================================================
       INVOICE FILTER
    ===================================================== */

    function filterInvoices() {

        if (!tableBody) return;

        const rows =
            tableBody.querySelectorAll("tr");

        const searchValue =
            searchInput
                ? searchInput.value
                    .trim()
                    .toLowerCase()
                : "";

        const selectedStatus =
            statusFilter
                ? statusFilter.value
                : "all";

        let visibleCount = 0;


        rows.forEach(row => {

            const rowText =
                row.textContent.toLowerCase();

            const rowStatus =
                row.dataset.status || "";


            const matchesSearch =
                rowText.includes(searchValue);


            const matchesStatus =
                selectedStatus === "all" ||
                rowStatus === selectedStatus;


            if (
                matchesSearch &&
                matchesStatus
            ) {

                row.style.display = "";

                visibleCount++;

            } else {

                row.style.display = "none";

            }

        });


        /* Empty State */

        if (emptyState) {

            emptyState.hidden =
                visibleCount !== 0;

        }

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterInvoices
        );

    }


    /* =====================================================
       STATUS FILTER
    ===================================================== */

    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            filterInvoices
        );

    }


    /* =====================================================
       CREATE INVOICE
    ===================================================== */

    if (createInvoiceBtn) {

        createInvoiceBtn.addEventListener(
            "click",
            () => {

                alert(
                    "Invoice creation form will be available soon."
                );

            }
        );

    }


    /* =====================================================
       ACTION BUTTONS
    ===================================================== */

    function attachActionButtons() {

        const actionButtons =
            document.querySelectorAll(
                ".invoice-action-btn"
            );


        actionButtons.forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    event.stopPropagation();


                    /* Remove existing menus */

                    document
                        .querySelectorAll(
                            ".invoice-action-menu"
                        )
                        .forEach(menu => {
                            menu.remove();
                        });


                    const row =
                        button.closest("tr");


                    if (!row) return;


                    const invoice =
                        row.querySelector(
                            "td strong"
                        );


                    const invoiceNumber =
                        invoice
                            ? invoice.textContent.trim()
                            : "Invoice";


                    /* Create menu */

                    const menu =
                        document.createElement("div");

                    menu.className =
                        "invoice-action-menu";


                    menu.innerHTML = `

                        <button type="button">
                            View ${invoiceNumber}
                        </button>

                        <button type="button">
                            Edit invoice
                        </button>

                        <button type="button">
                            Download PDF
                        </button>

                        <button
                            type="button"
                            class="delete-action"
                        >
                            Delete
                        </button>

                    `;


                    document.body.appendChild(menu);


                    /* Position menu */

                    const rect =
                        button.getBoundingClientRect();


                    menu.style.position =
                        "fixed";

                    menu.style.top =
                        `${rect.bottom + 5}px`;

                    menu.style.left =
                        `${rect.right - 150}px`;

                    menu.style.zIndex =
                        "9999";


                    /* Menu buttons */

                    menu
                        .querySelectorAll("button")
                        .forEach(menuButton => {

                            menuButton.addEventListener(
                                "click",
                                () => {

                                    const action =
                                        menuButton.textContent
                                            .trim();


                                    if (
                                        action === "Delete"
                                    ) {

                                        const confirmDelete =
                                            confirm(
                                                `Delete ${invoiceNumber}?`
                                            );


                                        if (
                                            confirmDelete
                                        ) {

                                            row.remove();

                                            filterInvoices();

                                        }

                                    } else {

                                        alert(
                                            `${action} — ${invoiceNumber}`
                                        );

                                    }


                                    menu.remove();

                                }
                            );

                        });

                }
            );

        });

    }


    attachActionButtons();


    /* =====================================================
       CLOSE ACTION MENU
    ===================================================== */

    document.addEventListener(
        "click",
        () => {

            document
                .querySelectorAll(
                    ".invoice-action-menu"
                )
                .forEach(menu => {

                    menu.remove();

                });

        }
    );


    /* =====================================================
       INITIAL FILTER
    ===================================================== */

    filterInvoices();

});