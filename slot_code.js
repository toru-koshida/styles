const dashboard = document.getElementById('dashboard');
const inputs = document.querySelectorAll('form#codeForm input[type="text"]');
const form = document.getElementById('codeForm');

inputs.forEach((input, i) => {
    input.addEventListener('input', e => {
        const value = e.target.value;
        if (!/^[0-9]$/.test(value)) {
            e.target.value = '';
            showMessage('数字のみ入力可能です', true);
            return;
        } else {
            clearMessage();
        }
        if (i < inputs.length - 1) {
            inputs[i + 1].focus();
        }
    });
    input.addEventListener('keydown', e => {
        if (e.key === 'Backspace' && !e.target.value && i > 0) {
            inputs[i - 1].focus();
        }
    });
});

function showMessage(msg, isError = false) {
    dashboard.textContent = msg;
    if (isError) {
        dashboard.classList.add('error');
    } else {
        dashboard.classList.remove('error');
    }
}
function clearMessage() {
    dashboard.textContent = '';
    dashboard.classList.remove('error');
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const code = Array.from(inputs).map(input => input.value).join('');
    if (code.length !== 8) {
        showMessage('8桁すべての数字を入力してください', true);
        return;
    }
    clearMessage();
    form.submit();
});