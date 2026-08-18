/* =========================================================
   BIZPILOT AI — ANALYTICS
   js/analytics.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const periodSelect =
        document.getElementById("analyticsPeriod");


    /* =====================================================
       ANALYTICS DATA
    ===================================================== */

    const analyticsData = {

        "30": {
            revenue: "$28,640",
            expenses: "$6,420",
            profit: "$22,220",
            margin: "77.6%",

            revenueChange: "↑ 12.8% vs previous period",
            expenseChange: "↑ 5.2% vs previous period",
            profitChange: "↑ 15.4% vs previous period",
            marginChange: "↑ 2.1% improvement"
        },


        "90": {
            revenue: "$48,920",
            expenses: "$10,840",
            profit: "$38,080",
            margin: "77.8%",

            revenueChange: "↑ 15.3% vs previous period",
            expenseChange: "↑ 6.7% vs previous period",
            profitChange: "↑ 18.2% vs previous period",
            marginChange: "↑ 2.8% improvement"
        },


        "180": {
            revenue: "$68,420",
            expenses: "$14,820",
            profit: "$53,600",
            margin: "78.3%",

            revenueChange: "↑ 17.1% vs previous period",
            expenseChange: "↑ 7.5% vs previous period",
            profitChange: "↑ 20.4% vs previous period",
            marginChange: "↑ 3.6% improvement"
        },


        "365": {
            revenue: "$84,620",
            expenses: "$18,420",
            profit: "$66,200",
            margin: "78.2%",

            revenueChange: "↑ 18.6% vs previous period",
            expenseChange: "↑ 8.4% vs previous period",
            profitChange: "↑ 22.1% vs previous period",
            marginChange: "↑ 4.3% improvement"
        }

    };


    /* =====================================================
       FIND STAT ELEMENTS
    ===================================================== */

    const statBoxes =
        document.querySelectorAll(
            ".analytics-stats-grid .stat-box"
        );


    function updateStats(data) {

        if (!statBoxes.length) return;


        const values = [
            data.revenue,
            data.expenses,
            data.profit,
            data.margin
        ];


        const changes = [
            data.revenueChange,
            data.expenseChange,
            data.profitChange,
            data.marginChange
        ];


        statBoxes.forEach((box, index) => {

            const value =
                box.querySelector(".stat-value");


            const change =
                box.querySelector(".stat-change");


            if (value && values[index]) {

                value.textContent =
                    values[index];

            }


            if (change && changes[index]) {

                change.textContent =
                    changes[index];

            }

        });

    }


    /* =====================================================
       REVENUE VALUE
    ===================================================== */

    function updateRevenueHeader(data) {

        const revenueValue =
            document.querySelector(
                ".analytics-chart-value"
            );


        if (revenueValue) {

            revenueValue.textContent =
                data.revenue;

        }

    }


    /* =====================================================
       BAR CHART ANIMATION
    ===================================================== */

    function animateBars() {

        const bars =
            document.querySelectorAll(
                ".mini-bar-chart div"
            );


        bars.forEach((bar, index) => {

            const height =
                bar.style.height;


            bar.style.height = "0";


            setTimeout(() => {

                bar.style.height =
                    height;

            }, index * 60);

        });

    }


    /* =====================================================
       PERIOD CHANGE
    ===================================================== */

    function updateAnalytics(period) {

        const data =
            analyticsData[period];


        if (!data) return;


        updateStats(data);

        updateRevenueHeader(data);

        animateBars();

    }


    if (periodSelect) {

        periodSelect.addEventListener(
            "change",
            () => {

                updateAnalytics(
                    periodSelect.value
                );

            }
        );

    }


    /* =====================================================
       CHART HOVER
    ===================================================== */

    const chart =
        document.querySelector(
            ".revenue-line-chart"
        );


    if (chart) {

        chart.addEventListener(
            "mousemove",
            event => {

                const rect =
                    chart.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const percentage =
                    Math.max(
                        0,
                        Math.min(
                            100,
                            (x / rect.width) * 100
                        )
                    );


                chart.dataset.position =
                    percentage.toFixed(0);

            }
        );

    }


    /* =====================================================
       AI INSIGHT LINK
    ===================================================== */

    const aiLink =
        document.querySelector(
            ".analytics-ai-card a"
        );


    if (aiLink) {

        aiLink.addEventListener(
            "click",
            () => {

                sessionStorage.setItem(
                    "aiPrompt",
                    "Analyze my business performance and suggest ways to improve revenue and profit."
                );

            }
        );

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    if (periodSelect) {

        updateAnalytics(
            periodSelect.value
        );

    }


    console.log(
        "BizPilot AI Analytics initialized."
    );

});