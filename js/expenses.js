/* =========================================================
   BIZPILOT AI — EXPENSES
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("expenseSearch");
    const categoryFilter = document.getElementById("categoryFilter");
    const tableBody = document.getElementById("expenseTableBody");
    const emptyState = document.getElementById("expenseEmptyState");
    const addExpenseBtn = document.getElementById("addExpenseBtn");


    /* =====================================================
       FILTER EXPENSES
    ===================================================== */

    function filterExpenses() {

        if (!tableBody) return;

        const rows = tableBody.querySelectorAll("tr");

        const searchValue = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

        const selectedCategory = categoryFilter
            ? categoryFilter.value
            : "all";

        let visibleCount = 0;


        rows.forEach(row => {

            const text =
                row.textContent.toLowerCase();

            const category =
                row.dataset.category || "";


            const searchMatch =
                text.includes(searchValue);

            const categoryMatch =
                selectedCategory === "all" ||
                category === selectedCategory;


            if (searchMatch && categoryMatch) {

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
            filterExpenses
        );

    }


    /* =====================================================
       CATEGORY FILTER
    ===================================================== */

    if (categoryFilter) {

        categoryFilter.addEventListener(
            "change",
            filterExpenses
        );

    }


    /* =====================================================
       ADD EXPENSE
    ===================================================== */

    if (addExpenseBtn) {

        addExpenseBtn.addEventListener(
            "click",
            () => {

                alert(
                    "Add Expense form will be available soon."
                );

            }
        );

    }


    /* =====================================================
       EXPENSE ACTION MENU
    ===================================================== */

    function createActionMenu(button, row) {

        closeActionMenus();


        const expenseNameElement =
            row.querySelector("td strong");


        const expenseName =
            expenseNameElement
                ? expenseNameElement.textContent.trim()
                : "Expense";


        const menu =
            document.createElement("div");

        menu.className =
            "expense-action-menu";


        menu.innerHTML = `

            <button type="button"
                data-action="view">
                View expense
            </button>

            <button type="button"
                data-action="edit">
                Edit expense
            </button>

            <button type="button"
                data-action="approve">
                Mark approved
            </button>

            <button type="button"
                class="delete-expense-action"
                data-action="delete">
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


        /* Keep menu inside viewport */

        if (left < 8) {
            left = 8;
        }

        if (left + 155 > window.innerWidth - 8) {
            left = window.innerWidth - 163;
        }

        if (top + 170 > window.innerHeight) {
            top = rect.top - 175;
        }


        menu.style.position = "fixed";
        menu.style.left = `${left}px`;
        menu.style.top = `${top}px`;
        menu.style.zIndex = "9999";


        /* Menu actions */

        menu.querySelectorAll("button")
            .forEach(actionButton => {

                actionButton.addEventListener(
                    "click",
                    event => {

                        event.stopPropagation();


                        const action =
                            actionButton.dataset.action;


                        if (action === "delete") {

                            const confirmDelete =
                                confirm(
                                    `Delete "${expenseName}"?`
                                );


                            if (confirmDelete) {

                                row.remove();

                                filterExpenses();

                            }

                        }


                        else if (action === "approve") {

                            const status =
                                row.querySelector(".status");


                            if (status) {

                                status.textContent =
                                    "Approved";

                                status.classList.remove(
                                    "pending"
                                );

                                status.classList.add(
                                    "paid"
                                );

                            }

                        }


                        else if (action === "edit") {

                            alert(
                                `Edit expense: ${expenseName}`
                            );

                        }


                        else if (action === "view") {

                            alert(
                                `Viewing expense: ${expenseName}`
                            );

                        }


                        closeActionMenus();

                    }
                );

            });

    }


    /* =====================================================
       ACTION BUTTONS
    ===================================================== */

    function attachActionButtons() {

        const buttons =
            document.querySelectorAll(
                ".expense-action-btn"
            );


        buttons.forEach(button => {

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

        });

    }


    /* =====================================================
       CLOSE ACTION MENUS
    ===================================================== */

    function closeActionMenus() {

        document
            .querySelectorAll(
                ".expense-action-menu"
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
       CLOSE MENU ON SCROLL
    ===================================================== */

    window.addEventListener(
        "scroll",
        closeActionMenus,
        true
    );


    /* =====================================================
       INITIALIZE
    ===================================================== */

    attachActionButtons();

    filterExpenses();

});