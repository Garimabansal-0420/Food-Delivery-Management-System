   let selectedTable = "T4";


        /* SELECT TABLE */

        function selectTable(element) {

            if (element.classList.contains("occupied")) {
                return;
            }


            document
                .querySelectorAll(".table-item")
                .forEach(function (table) {

                    table.classList.remove("selected");

                    const label =
                        table.querySelector(".selected-label");

                    if (label) {
                        label.remove();
                    }

                });


            element.classList.add("selected");


            const label =
                document.createElement("span");

            label.className = "selected-label";

            label.innerText = "SELECTED";

            element.prepend(label);


            selectedTable =
                element.dataset.table;


            const seats =
                parseInt(element.dataset.seats);


            document.getElementById("quickTable")
                .innerText = selectedTable;


            document.getElementById("summaryTable")
                .innerText = selectedTable;


            const guestSelect =
                document.getElementById("guestCount");


            if (guestSelect) {

                let currentGuests =
                    parseInt(guestSelect.value);


                if (currentGuests > seats) {
                    guestSelect.value = seats;
                }


                updateGuests();

            }

        }



        /* UPDATE GUESTS */

        function updateGuests() {

            const guests =
                document.getElementById("guestCount").value;


            const text =
                guests == 1
                    ? "1 Guest"
                    : guests + " Guests";


            document.getElementById("quickGuests")
                .innerText = text;


            document.getElementById("summaryGuests")
                .innerText = text;

        }



        /* SPECIAL REQUEST */

        function toggleRequest(element) {

            element.classList.toggle("active");

        }



        /* SCROLL */

        function scrollToTables() {

            document
                .getElementById("tableSection")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }



        /* BACK */

        function goBack() {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }



        /* DATE */

        const dateInput =
            document.getElementById("bookingDate");


        const today =
            new Date()
                .toISOString()
                .split("T")[0];


        dateInput.min = today;


        dateInput.addEventListener(
            "change",
            updateSummaryDate
        );


        document
            .getElementById("bookingTime")
            .addEventListener(
                "change",
                updateSummaryDate
            );


        function updateSummaryDate() {

            if (!dateInput.value) {
                return;
            }


            const date =
                new Date(dateInput.value);


            const formatted =
                date.toLocaleDateString(
                    "en-IN",
                    {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                    }
                );


            const time =
                document.getElementById("bookingTime").value;


            document.getElementById("summaryDate")
                .innerText =
                formatted + " • " + time;

        }



        /* RESET */

        function resetBooking() {

            document
                .querySelectorAll(".table-item")
                .forEach(function (table) {

                    table.classList.remove("selected");

                    const label =
                        table.querySelector(".selected-label");

                    if (label) {
                        label.remove();
                    }

                });


            const defaultTable =
                document.querySelector(
                    '[data-table="T4"]'
                );


            defaultTable.classList.add("selected");


            const label =
                document.createElement("span");

            label.className = "selected-label";

            label.innerText = "SELECTED";

            defaultTable.prepend(label);


            selectedTable = "T4";


            document.getElementById("quickTable")
                .innerText = "T4";


            document.getElementById("summaryTable")
                .innerText = "T4";


            document.getElementById("guestCount")
                .value = "2";


            updateGuests();


            document.getElementById("bookingDate")
                .value = "";


            document.getElementById("summaryDate")
                .innerText = "Select Date";


            document
                .querySelectorAll(".request-option")
                .forEach(function (option) {

                    option.classList.remove("active");

                });


            document.getElementById("customerName")
                .value = "";


            document.getElementById("customerPhone")
                .value = "";


            document.getElementById("customerEmail")
                .value = "";

        }



        /* CONFIRM BOOKING */

        function confirmBooking() {

            const name =
                document.getElementById("customerName")
                    .value.trim();


            const phone =
                document.getElementById("customerPhone")
                    .value.trim();


            const date =
                document.getElementById("bookingDate")
                    .value;


            if (!name) {

                alert("Please enter your name.");

                document.getElementById("customerName")
                    .focus();

                return;

            }


            if (!phone) {

                alert("Please enter your phone number.");

                document.getElementById("customerPhone")
                    .focus();

                return;

            }


            if (!date) {

                alert("Please select booking date.");

                document.getElementById("bookingDate")
                    .focus();

                return;

            }


            const guests =
                document.getElementById("guestCount")
                    .value;


            alert(
                "🎉 Booking Confirmed!\n\n" +
                "Restaurant: Spice Haven\n" +
                "Table: " + selectedTable + "\n" +
                "Guests: " + guests + "\n\n" +
                "Thank you, " + name + "!"
            );

        }



        /* CALL RESTAURANT */

        function callRestaurant() {

            window.location.href =
                "tel:+919876543210";

        }


        /* INITIALIZE */

        updateGuests();