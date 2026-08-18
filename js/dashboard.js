document.addEventListener("DOMContentLoaded", () => {

    const revenuePeriod =
        document.getElementById("revenuePeriod");

    if (revenuePeriod) {

        revenuePeriod.addEventListener("change", () => {

            console.log(
                "Revenue period:",
                revenuePeriod.value
            );

        });

    }

});