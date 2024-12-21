import "./Button.css";

export const Button = (icon, text) => `
<button type="button" class="btn">
<img src=${icon} alt='${text} icon'/>
</button>`;
