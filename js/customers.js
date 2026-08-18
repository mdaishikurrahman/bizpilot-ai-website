/* =========================================================
   BIZPILOT AI — CUSTOMERS
   js/customers.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const searchInput =
        document.getElementById("customerSearch");

    const statusFilter =
        document.getElementById("customerStatusFilter");

    const tableBody =
        document.getElementById("customerTableBody");

    const emptyState =
        document.getElementById("customerEmptyState");

    const addCustomerBtn =
        document.getElementById("addCustomerBtn");


    /* =====================================================
       FILTER CUSTOMERS
    ===================================================== */

    function filterCustomers() {

        if (!tableBody) return;

        const rows =
            tableBody.querySelectorAll("tr");

        const searchValue =
            searchInput
                ? searchInput.value.trim().toLowerCase()
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


            const searchMatch =
                rowText.includes(searchValue);


            const statusMatch =
                selectedStatus === "all" ||
                rowStatus === selectedStatus;


            if (searchMatch && statusMatch) {

                row.style.display = "";

                visibleCount++;

            } else {

                row.style.display = "none";

            }

        });


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
            filterCustomers
        );

    }


    /* =====================================================
       STATUS FILTER
    ===================================================== */

    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            filterCustomers
        );

    }


    /* =====================================================
       ADD CUSTOMER
    ===================================================== */

    if (addCustomerBtn) {

        addCustomerBtn.addEventListener(
            "click",
            () => {

                const name =
                    prompt("Customer name:");

                if (!name || !name.trim()) {
                    return;
                }


                const company =
                    prompt("Company name:") ||
                    "Individual";


                const email =
                    prompt("Email address:") ||
                    "No email";


                const phone =
                    prompt("Phone number:") ||
                    "No phone";


                const initials =
                    getInitials(name);


                const newRow =
                    document.createElement("tr");


                newRow.dataset.status =
                    "active";


                newRow.innerHTML = `

                    <td>

                        <div class="customer-name-cell">

                            <span class="customer-avatar">
                                ${initials}
                            </span>

                            <strong>
                                ${escapeHTML(name.trim())}
                            </strong>

                        </div>

                    </td>


                    <td>
                        ${escapeHTML(company.trim())}
                    </td>


                    <td>
                        ${escapeHTML(email.trim())}
                    </td>


                    <td>
                        ${escapeHTML(phone.trim())}
                    </td>


                    <td>
                        $0
                    </td>


                    <td>

                        <span class="status paid">
                            Active
                        </span>

                    </td>


                    <td>

                        <button
                            type="button"
                            class="invoice-action-btn customer-action-btn"
                        >
                            ⋮
                        </button>

                    </td>

                `;


                if (tableBody) {

                    tableBody.prepend(newRow);

                    attachActionButton(
                        newRow.querySelector(
                            ".customer-action-btn"
                        )
                    );

                    filterCustomers();

                }

            }
        );

    }


    /* =====================================================
       ACTION MENU
    ===================================================== */

    function createActionMenu(button, row) {

        closeActionMenus();


        const nameElement =
            row.querySelector(
                ".customer-name-cell strong"
            );


        const customerName =
            nameElement
                ? nameElement.textContent.trim()
                : "Customer";


        const menu =
            document.createElement("div");


        menu.className =
            "customer-action-menu";


        menu.innerHTML = `

            <button
                type="button"
                data-action="view"
            >
                View customer
            </button>


            <button
                type="button"
                data-action="edit"
            >
                Edit customer
            </button>


            <button
                type="button"
                data-action="toggle"
            >
                Change status
            </button>


            <button
                type="button"
                class="delete-customer-action"
                data-action="delete"
            >
                Delete
            </button>

        `;


        document.body.appendChild(menu);


        const rect =
            button.getBoundingClientRect();


        let left =
            rect.right - 155;


        let top =
            rect.bottom + 5;


        /* Keep menu inside screen */

        if (left < 8) {
            left = 8;
        }


        if (left + 155 > window.innerWidth - 8) {

            left =
                window.innerWidth - 163;

        }


        if (top + 160 > window.innerHeight) {

            top =
                rect.top - 165;

        }


        menu.style.position = "fixed";

        menu.style.left =
            `${left}px`;

        menu.style.top =
            `${top}px`;

        menu.style.zIndex =
            "9999";


        /* =================================================
           MENU BUTTONS
        ================================================= */

        menu.querySelectorAll("button")
            .forEach(actionButton => {

                actionButton.addEventListener(
                    "click",
                    event => {

                        event.stopPropagation();


                        const action =
                            actionButton.dataset.action;


                        /* VIEW */

                        if (action === "view") {

                            alert(
                                `Viewing customer: ${customerName}`
                            );

                        }


                        /* EDIT */

                        else if (action === "edit") {

                            alert(
                                `Edit customer: ${customerName}`
                            );

                        }


                        /* TOGGLE STATUS */

                        else if (action === "toggle") {

                            changeCustomerStatus(
                                row
                            );

                        }


                        /* DELETE */

                        else if (action === "delete") {

                            const confirmed =
                                confirm(
                                    `Delete "${customerName}"?`
                                );


                            if (confirmed) {

                                row.remove();

                                filterCustomers();

                            }

                        }


                        closeActionMenus();

                    }
                );

            });

    }


    /* =====================================================
       CHANGE CUSTOMER STATUS
    ===================================================== */

    function changeCustomerStatus(row) {

        const currentStatus =
            row.dataset.status;


        const statusElement =
            row.querySelector(".status");


        if (!statusElement) return;


        if (currentStatus === "active") {

            row.dataset.status =
                "inactive";


            statusElement.textContent =
                "Inactive";


            statusElement.classList.remove(
                "paid"
            );


            statusElement.classList.add(
                "pending"
            );

        } else {

            row.dataset.status =
                "active";


            statusElement.textContent =
                "Active";


            statusElement.classList.remove(
                "pending"
            );


            statusElement.classList.add(
                "paid"
            );

        }


        filterCustomers();

    }


    /* =====================================================
       ATTACH ACTION BUTTON
    ===================================================== */

    function attachActionButton(button) {

        if (!button) return;


        button.addEventListener(
            "click",
            event => {

                event.stopPropagation();


                const row =
                    button.closest("tr");


                if (!row) return;


                createActionMenu(
                    button,
                    row
                );

            }
        );

    }


    /* =====================================================
       INITIAL ACTION BUTTONS
    ===================================================== */

    document
        .querySelectorAll(
            ".customer-action-btn"
        )
        .forEach(button => {

            attachActionButton(button);

        });


    /* =====================================================
       CLOSE ACTION MENUS
    ===================================================== */

    function closeActionMenus() {

        document
            .querySelectorAll(
                ".customer-action-menu"
            )
            .forEach(menu => {

                menu.remove();

            });

    }


    document.addEventListener(
        "click",
        closeActionMenus
    );


    /* =====================================================
       CLOSE ON SCROLL
    ===================================================== */

    window.addEventListener(
        "scroll",
        closeActionMenus,
        true
    );


    /* =====================================================
       GET INITIALS
    ===================================================== */

    function getInitials(name) {

        const words =
            name.trim().split(/\s+/);


        if (words.length === 1) {

            return words[0]
                .substring(0, 2)
                .toUpperCase();

        }


        return (
            words[0][0] +
            words[words.length - 1][0]
        ).toUpperCase();

    }


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHTML(value) {

        const div =
            document.createElement("div");


        div.textContent =
            value;


        return div.innerHTML;

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    filterCustomers();

});