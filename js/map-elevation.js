
document.addEventListener("DOMContentLoaded", () => {

    const svg = document.querySelector("#mapbase svg");
    if (!svg) return;

    let activeState = null;
    let savedElements = [];

    function restoreStatePosition() {

        if (!activeState) return;

        activeState.classList.remove("state-elevated");
        savedElements.forEach(item => {
            if (item.element.matches("foreignObject")) {
                item.element.classList.remove("state-elevated-icon");
            }
        });

        // Restore icons and state to their original positions
        for (let i = savedElements.length - 1; i >= 0; i--) {

            const item = savedElements[i];

            if (item.nextSibling &&
                item.nextSibling.parentNode === item.parent) {

                item.parent.insertBefore(item.element, item.nextSibling);

            } else {
                item.parent.appendChild(item.element);
            }
        }

        activeState = null;
        savedElements = [];
    }

    function activateState(state) {

        if (state === activeState) return;

        restoreStatePosition();

        if (!state) return;

        activeState = state;

        const icons = svg.querySelectorAll(
            `[data-state-id="${state.id}"]`
        );
        icons.forEach(icon => {
            icon.classList.add("state-elevated-icon");
        });

        const elements = [state, ...icons];

        // Save original positions
        savedElements = elements.map(element => ({
            element: element,
            parent: element.parentNode,
            nextSibling: element.nextSibling
        }));

        // Move state within its original group
        state.parentNode.appendChild(state);

        // Bring its icons to the front
        icons.forEach(icon => {
            svg.appendChild(icon);
        });

        state.classList.add("state-elevated");
    }

    function updateState(x, y) {

        if (activeState) {
            activeState.style.pointerEvents = "none";
        }

        const element = document.elementFromPoint(x, y);

        if (activeState) {
            activeState.style.pointerEvents = "";
        }

        const newState = element?.closest('path[id^="tryjs"]');

        if (!newState || !svg.contains(newState)) return;

        if (newState !== activeState) {
            activateState(newState);
        }
    }

    svg.addEventListener("pointermove", event => {
        updateState(event.clientX, event.clientY);
    });

    svg.addEventListener("pointerleave", restoreStatePosition);

});
