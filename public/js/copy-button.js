// Based on https://www.roboleary.net/2022/01/13/copy-code-to-clipboard-blog.html
document.addEventListener("DOMContentLoaded", function () {
    let blocks = document.querySelectorAll("pre[class^='language-']");

    blocks.forEach((block) => {
        if (navigator.clipboard) {
            let container = document.createElement("div");
            container.classList.add("pre-container");

            block.parentNode.insertBefore(container, block);
            container.appendChild(block);

            let button = document.createElement("button");
            let icon = document.createElement("i");
            icon.classList.add("icon");
            button.appendChild(icon);
            container.appendChild(button);

            button.addEventListener("click", async () => {
                await copyCode(block, button);
            });
        }
    });

    async function copyCode(block, button) {
        let code = block.querySelector("code");
        let text = code.innerText;

        await navigator.clipboard.writeText(text);

        button.classList.add("active");

        setTimeout(() => {
            button.classList.remove("active");
        }, 800);
    }
});
