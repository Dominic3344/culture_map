document.addEventListener("DOMContentLoaded", function () {

    const map = document.querySelector("#mapbase svg");

    if (!map) return;

    // KERALA ICON
    const kerala = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "foreignObject"
    );

    kerala.setAttribute("id", "kerala-icon-container");
    kerala.setAttribute("data-state-id", "tryjs20");
    kerala.setAttribute("x", "210");
    kerala.setAttribute("y", "680");
    kerala.setAttribute("width", "100");
    kerala.setAttribute("height", "100");

    kerala.innerHTML = `
        <div xmlns="http://www.w3.org/1999/xhtml"
             class="kerala-icon-wrapper">
            <img src="image/kerala-houseboat.svg"
                 class="kerala-houseboat"
                 alt="Kerala houseboat">
        </div>
    `;

    map.appendChild(kerala);


    // KARNATAKA PALACE ICON
    const karnataka = document.getElementById("tryjs21");

    if (karnataka) {

        const box = karnataka.getBBox();

        const palace = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "foreignObject"
        );

        palace.setAttribute("id", "karnataka-icon-container");
        palace.setAttribute("data-state-id", "tryjs21");

        palace.setAttribute("x", box.x + box.width / 2 - 40);
        palace.setAttribute("y", box.y + box.height / 2 - 40);
        palace.setAttribute("width", "80");
        palace.setAttribute("height", "80");

        palace.innerHTML = `
            <div xmlns="http://www.w3.org/1999/xhtml"
                 class="karnataka-icon-wrapper">
                <img src="image/karnataka-palace.svg"
                     class="karnataka-palace"
                     alt="Karnataka palace">
            </div>
        `;

        map.appendChild(palace);
    }


// MAHARASHTRA ICON
const maharashtra = document.getElementById("tryjs18");

if (maharashtra) {

    const box = maharashtra.getBBox();

    const icon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "foreignObject"
    );

    icon.setAttribute("id", "maharashtra-icon-container");
    icon.setAttribute("data-state-id", "tryjs18");
    icon.setAttribute("x", box.x + box.width / 2 - 40);
    icon.setAttribute("y", box.y + box.height / 2 - 40);
    icon.setAttribute("width", "80");
    icon.setAttribute("height", "80");

    icon.innerHTML = `
        <div xmlns="http://www.w3.org/1999/xhtml"
             class="maharashtra-icon-wrapper">
            <img src="image/maharashtra.svg"
                 class="maharashtra-icon"
                 alt="Maharashtra Gateway of India">
        </div>
    `;

    map.appendChild(icon);
}
// PUNJAB ICON
const punjab = document.getElementById("tryjs11");

if (punjab) {

    const box = punjab.getBBox();

    const icon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "foreignObject"
    );

    icon.setAttribute("id", "punjab-icon-container");
    icon.setAttribute("data-state-id", "tryjs11");
    icon.setAttribute("x", box.x + box.width / 2 - 40);
    icon.setAttribute("y", box.y + box.height / 2 - 40);
    icon.setAttribute("width", "80");
    icon.setAttribute("height", "80");

    icon.innerHTML = `
        <div xmlns="http://www.w3.org/1999/xhtml"
             class="punjab-icon-wrapper">
            <img src="image/punjab.svg"
                 class="punjab-icon"
                 alt="Punjab architecture">
        </div>
    `;

    map.appendChild(icon);
}
// HARYANA ICON
const haryana = document.getElementById("tryjs24");

if (haryana) {

    const box = haryana.getBBox();

    const icon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "foreignObject"
    );

    icon.setAttribute("id", "haryana-icon-container");
    icon.setAttribute("data-state-id", "tryjs24");
    icon.setAttribute("x", box.x + box.width / 2 - 40);
    icon.setAttribute("y", box.y + box.height / 2 - 40);
    icon.setAttribute("width", "80");
    icon.setAttribute("height", "80");

    icon.innerHTML = `
        <div xmlns="http://www.w3.org/1999/xhtml"
             class="haryana-icon-wrapper">
            <img src="image/haryana.svg"
                 class="haryana-icon"
                 alt="Haryana architecture">
        </div>
    `;

    map.appendChild(icon);
}
// UTTAR PRADESH ICON
const uttarPradesh = document.getElementById("tryjs4");

if (uttarPradesh) {

    const box = uttarPradesh.getBBox();

    const icon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "foreignObject"
    );

    icon.setAttribute("id", "uttar-pradesh-icon-container");
    icon.setAttribute("data-state-id", "tryjs4");
    icon.setAttribute("x", box.x + box.width / 2 - 40);
    icon.setAttribute("y", box.y + box.height / 2 - 40);
    icon.setAttribute("width", "80");
    icon.setAttribute("height", "80");

    icon.innerHTML = `
        <div xmlns="http://www.w3.org/1999/xhtml"
             class="uttar-pradesh-icon-wrapper">
            <img src="image/uttar-pradesh.svg"
                 class="uttar-pradesh-icon"
                 alt="Taj Mahal">
        </div>
    `;

    map.appendChild(icon);
}
// MADHYA PRADESH ICON
const madhyaPradesh = document.getElementById("tryjs15");

if (madhyaPradesh) {

    const box = madhyaPradesh.getBBox();

    const icon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "foreignObject"
    );

    icon.setAttribute("id", "madhya-pradesh-icon-container");
    icon.setAttribute("data-state-id", "tryjs15");
    icon.setAttribute("x", box.x + box.width / 2 - 40);
    icon.setAttribute("y", box.y + box.height / 2 - 40);
    icon.setAttribute("width", "80");
    icon.setAttribute("height", "80");

    icon.innerHTML = `
        <div xmlns="http://www.w3.org/1999/xhtml"
             class="madhya-pradesh-icon-wrapper">
            <img src="image/madhya-pradesh.svg"
                 class="madhya-pradesh-icon"
                 alt="Madhya Pradesh architecture">
        </div>
    `;

    map.appendChild(icon);
}
// WEST BENGAL ICON
const westBengal = document.getElementById("tryjs2");

if (westBengal) {

    const box = westBengal.getBBox();

    const icon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "foreignObject"
    );

    icon.setAttribute("id", "west-bengal-icon-container");
    icon.setAttribute("data-state-id", "tryjs2");
    icon.setAttribute("x", box.x + box.width / 2 - 40);
    icon.setAttribute("y", box.y + box.height / 2 - 40);
    icon.setAttribute("width", "80");
    icon.setAttribute("height", "80");

    icon.innerHTML = `
        <div xmlns="http://www.w3.org/1999/xhtml"
             class="west-bengal-icon-wrapper">
            <img src="image/west-bengal.svg"
                 class="west-bengal-icon"
                 alt="West Bengal architecture">
        </div>
    `;

    map.appendChild(icon);
}
// TELANGANA ICON
const telangana = document.getElementById("tryjs7");

if (telangana) {

    const box = telangana.getBBox();

    const icon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "foreignObject"
    );

    icon.setAttribute("id", "telangana-icon-container");
    icon.setAttribute("data-state-id", "tryjs7");
    icon.setAttribute("x", box.x + box.width / 2 - 40);
    icon.setAttribute("y", box.y + box.height / 2 - 40);
    icon.setAttribute("width", "80");
    icon.setAttribute("height", "80");

    icon.innerHTML = `
        <div xmlns="http://www.w3.org/1999/xhtml"
             class="telangana-icon-wrapper">
            <img src="image/telangana.svg"
                 class="telangana-icon"
                 alt="Telangana architecture">
        </div>
    `;

    map.appendChild(icon);
}
// TAMIL NADU ICON
const tamilNadu = document.getElementById("tryjs6");

if (tamilNadu) {

    const box = tamilNadu.getBBox();

    const icon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "foreignObject"
    );

    icon.setAttribute("id", "tamil-nadu-icon-container");
    icon.setAttribute("data-state-id", "tryjs6");
    icon.setAttribute("x", box.x + box.width / 2 - 40);
    icon.setAttribute("y", box.y + box.height / 2 - 40);
    icon.setAttribute("width", "80");
    icon.setAttribute("height", "80");

    icon.innerHTML = `
        <div xmlns="http://www.w3.org/1999/xhtml"
             class="tamil-nadu-icon-wrapper">
            <img src="image/tamil-nadu.svg"
                 class="tamil-nadu-icon"
                 alt="Tamil Nadu temple">
        </div>
    `;

    map.appendChild(icon);
}
// GUJARAT ICON
const gujarat = document.getElementById("tryjs26");

if (gujarat) {

    const box = gujarat.getBBox();

    const icon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "foreignObject"
    );

    icon.setAttribute("id", "gujarat-icon-container");
    icon.setAttribute("data-state-id", "tryjs26");
    icon.setAttribute("x", box.x + box.width / 2 - 40);
    icon.setAttribute("y", box.y + box.height / 2 - 40);
    icon.setAttribute("width", "80");
    icon.setAttribute("height", "80");

    icon.innerHTML = `
        <div xmlns="http://www.w3.org/1999/xhtml"
             class="gujarat-icon-wrapper">
            <img src="image/gujarat.svg"
                 class="gujarat-icon"
                 alt="Gujarat architecture">
        </div>
    `;

    map.appendChild(icon);
}
// JHARKHAND ICON
const jharkhand = document.getElementById("tryjs23");

if (jharkhand) {

    const box = jharkhand.getBBox();

    const icon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "foreignObject"
    );

    icon.setAttribute("id", "jharkhand-icon-container");
    icon.setAttribute("data-state-id", "tryjs23");
    icon.setAttribute("x", box.x + box.width / 2 - 40);
    icon.setAttribute("y", box.y + box.height / 2 - 40);
    icon.setAttribute("width", "80");
    icon.setAttribute("height", "80");

    icon.innerHTML = `
        <div xmlns="http://www.w3.org/1999/xhtml"
             class="jharkhand-icon-wrapper">
            <img src="image/jharkhand.svg"
                 class="jharkhand-icon"
                 alt="Jharkhand architecture">
        </div>
    `;

    map.appendChild(icon);
}
// UTTARAKHAND ICON
const uttarakhand = document.getElementById("tryjs3");

if (uttarakhand) {

    const box = uttarakhand.getBBox();

    const icon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "foreignObject"
    );

    icon.setAttribute("id", "uttarakhand-icon-container");
    icon.setAttribute("data-state-id", "tryjs3");
    icon.setAttribute("x", box.x + box.width / 2 - 40);
    icon.setAttribute("y", box.y + box.height / 2 - 40);
    icon.setAttribute("width", "80");
    icon.setAttribute("height", "80");

    icon.innerHTML = `
        <div xmlns="http://www.w3.org/1999/xhtml"
             class="uttarakhand-icon-wrapper">
            <img src="image/uttarakhand.svg"
                 class="uttarakhand-icon"
                 alt="Uttarakhand temple">
        </div>
    `;

    map.appendChild(icon);
}
// ANDHRA PRADESH ICON
const andhraPradesh = document.getElementById("tryjs36");

if (andhraPradesh) {

    const box = andhraPradesh.getBBox();

    const icon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "foreignObject"
    );

    icon.setAttribute("id", "andhra-pradesh-icon-container");
    icon.setAttribute("data-state-id", "tryjs36");
    icon.setAttribute("x", box.x + box.width / 2 - 40);
    icon.setAttribute("y", box.y + box.height / 2 - 40);
    icon.setAttribute("width", "80");
    icon.setAttribute("height", "80");

    icon.innerHTML = `
        <div xmlns="http://www.w3.org/1999/xhtml"
             class="andhra-pradesh-icon-wrapper">
            <img src="image/andhra-pradesh.svg"
                 class="andhra-pradesh-icon"
                 alt="Andhra Pradesh architecture">
        </div>
    `;

    map.appendChild(icon);
}
// RAJASTHAN ICON
const rajasthan = document.getElementById("tryjs9");

if (rajasthan) {

    const box = rajasthan.getBBox();

    const icon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "foreignObject"
    );

    icon.setAttribute("id", "rajasthan-icon-container");
    icon.setAttribute("data-state-id", "tryjs9");
    icon.setAttribute("x", box.x + box.width / 2 - 40);
    icon.setAttribute("y", box.y + box.height / 2 - 40);
    icon.setAttribute("width", "80");
    icon.setAttribute("height", "80");

    icon.innerHTML = `
        <div xmlns="http://www.w3.org/1999/xhtml"
             class="rajasthan-icon-wrapper">
            <img src="image/rajasthan-new.svg"
                 class="rajasthan-icon"
                 alt="Rajasthan palace">
        </div>
    `;

    map.appendChild(icon);
}
// ODISHA ICON
const odisha = document.getElementById("tryjs12");

if (odisha) {

    const box = odisha.getBBox();

    const icon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "foreignObject"
    );

    icon.setAttribute("id", "odisha-icon-container");
    icon.setAttribute("data-state-id", "tryjs12");
    icon.setAttribute("x", box.x + box.width / 2 - 40);
    icon.setAttribute("y", box.y + box.height / 2 - 40);
    icon.setAttribute("width", "80");
    icon.setAttribute("height", "80");

    icon.innerHTML = `
        <div xmlns="http://www.w3.org/1999/xhtml"
             class="odisha-icon-wrapper">
            <img src="image/odisha.svg"
                 class="odisha-icon"
                 alt="Odisha Konark wheel">
        </div>
    `;

    map.appendChild(icon);
}
// CHHATTISGARH ICON
const chhattisgarh = document.getElementById("tryjs31");

if (chhattisgarh) {

    const box = chhattisgarh.getBBox();

    const icon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "foreignObject"
    );

    icon.setAttribute("id", "chhattisgarh-icon-container");
    icon.setAttribute("data-state-id", "tryjs31");
    icon.setAttribute("x", box.x + box.width / 2 - 40);
    icon.setAttribute("y", box.y + box.height / 2 - 40);
    icon.setAttribute("width", "80");
    icon.setAttribute("height", "80");

    icon.innerHTML = `
        <div xmlns="http://www.w3.org/1999/xhtml"
             class="chhattisgarh-icon-wrapper">
            <img src="image/chhattisgarh.svg"
                 class="chhattisgarh-icon"
                 alt="Chhattisgarh tribal dancers">
        </div>
    `;

    map.appendChild(icon);
}
// BIHAR ICON
const bihar = document.getElementById("tryjs33");

if (bihar) {

    const box = bihar.getBBox();

    const icon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "foreignObject"
    );

    icon.setAttribute("id", "bihar-icon-container");
    icon.setAttribute("data-state-id", "tryjs33");
    icon.setAttribute("x", box.x + box.width / 2 - 40);
    icon.setAttribute("y", box.y + box.height / 2 - 40);
    icon.setAttribute("width", "80");
    icon.setAttribute("height", "80");

    icon.innerHTML = `
        <div xmlns="http://www.w3.org/1999/xhtml"
             class="bihar-icon-wrapper">
            <img src="image/bihar.svg"
                 class="bihar-icon"
                 alt="Bihar Buddha icon">
        </div>
    `;

    map.appendChild(icon);
}
// ASSAM ICON
const assam = document.getElementById("tryjs34");

if (assam) {

    const box = assam.getBBox();

    const icon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "foreignObject"
    );

    icon.setAttribute("id", "assam-icon-container");
    icon.setAttribute("data-state-id", "tryjs34");
    icon.setAttribute("x", box.x + box.width / 2 - 40);
    icon.setAttribute("y", box.y + box.height / 2 - 40);
    icon.setAttribute("width", "80");
    icon.setAttribute("height", "80");

    icon.innerHTML = `
        <div xmlns="http://www.w3.org/1999/xhtml"
             class="assam-icon-wrapper">
            <img src="image/assam.svg"
                 class="assam-icon"
                 alt="Assam rhinoceros">
        </div>
    `;

    map.appendChild(icon);
}
// MEGHALAYA ICON
const meghalaya = document.getElementById("tryjs17");

if (meghalaya) {

    const box = meghalaya.getBBox();

    const icon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "foreignObject"
    );

    icon.setAttribute("id", "meghalaya-icon-container");
    icon.setAttribute("data-state-id", "tryjs17");
    icon.setAttribute("x", box.x + box.width / 2 - 40);
    icon.setAttribute("y", box.y + box.height / 2 - 40);
    icon.setAttribute("width", "80");
    icon.setAttribute("height", "80");

    icon.innerHTML = `
        <div xmlns="http://www.w3.org/1999/xhtml"
             class="meghalaya-icon-wrapper">
            <img src="image/meghalaya.svg"
                 class="meghalaya-icon"
                 alt="Meghalaya elephant">
        </div>
    `;

    map.appendChild(icon);
}
// MIZORAM ICON
const mizoram = document.getElementById("tryjs14");

if (mizoram) {

    const box = mizoram.getBBox();

    const icon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "foreignObject"
    );

    icon.setAttribute("id", "mizoram-icon-container");
    icon.setAttribute("data-state-id", "tryjs14");
    icon.setAttribute("x", box.x + box.width / 2 - 40);
    icon.setAttribute("y", box.y + box.height / 2 - 40);
    icon.setAttribute("width", "80");
    icon.setAttribute("height", "80");

    icon.innerHTML = `
        <div xmlns="http://www.w3.org/1999/xhtml"
             class="mizoram-icon-wrapper">
            <img src="image/mizoram.svg"
                 class="mizoram-icon"
                 alt="Mizoram bamboo icon">
        </div>
    `;

    map.appendChild(icon);
}
// MANIPUR ICON
const manipur = document.getElementById("tryjs16");

if (manipur) {

    const box = manipur.getBBox();

    const icon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "foreignObject"
    );

    icon.setAttribute("id", "manipur-icon-container");
    icon.setAttribute("data-state-id", "tryjs16");
    icon.setAttribute("x", box.x + box.width / 2 - 40);
    icon.setAttribute("y", box.y + box.height / 2 - 40);
    icon.setAttribute("width", "80");
    icon.setAttribute("height", "80");

    icon.innerHTML = `
        <div xmlns="http://www.w3.org/1999/xhtml"
             class="manipur-icon-wrapper">
            <img src="image/manipur.svg"
                 class="manipur-icon"
                 alt="Manipur Ferris wheel">
        </div>
    `;

    map.appendChild(icon);
}

// ARUNACHAL PRADESH ICON
const arunachalPradesh = document.getElementById("tryjs35");

if (arunachalPradesh) {

    const box = arunachalPradesh.getBBox();

    const icon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "foreignObject"
    );

    icon.setAttribute("id", "arunachal-pradesh-icon-container");
    icon.setAttribute("data-state-id", "tryjs35");
    icon.setAttribute("x", box.x + box.width / 2 - 40);
    icon.setAttribute("y", box.y + box.height / 2 - 40);
    icon.setAttribute("width", "80");
    icon.setAttribute("height", "80");

    icon.innerHTML = `
        <div xmlns="http://www.w3.org/1999/xhtml"
             class="arunachal-pradesh-icon-wrapper">
            <img src="image/arunachal-pradesh.svg"
                 class="arunachal-pradesh-icon"
                 alt="Arunachal Pradesh mountains">
        </div>
    `;

    map.appendChild(icon);
}

});
