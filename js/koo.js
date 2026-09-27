// ==========================================
// 1. MODO DÍA / NOCHE
// Detecta tanto id="btnTema" como id="toggle-theme"
// ==========================================
const btnTema = document.getElementById('btnTema') || document.getElementById('toggle-theme');

if (btnTema) {
    btnTema.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
}

// ==========================================
// 2. MOSTRAR / OCULTAR CONTRASEÑA
// ==========================================
// Para Registro
const verPasswordRegistro = document.getElementById('verPasswordRegistro');
const passwordRegistro = document.getElementById('passwordRegistro');

if (verPasswordRegistro && passwordRegistro) {
    verPasswordRegistro.addEventListener('click', () => {
        const tipo = passwordRegistro.type === 'password' ? 'text' : 'password';
        passwordRegistro.type = tipo;
        verPasswordRegistro.textContent = tipo === 'password' ? '👁 Mostrar contraseña' : '🙈 Ocultar contraseña';
    });
}

// Para Recuperar Contraseña
const verNuevaPassword = document.getElementById('verNuevaPassword');
const nuevaPassword = document.getElementById('nuevaPassword');

if (verNuevaPassword && nuevaPassword) {
    verNuevaPassword.addEventListener('click', () => {
        const tipo = nuevaPassword.type === 'password' ? 'text' : 'password';
        nuevaPassword.type = tipo;
        verNuevaPassword.textContent = tipo === 'password' ? '👁 Mostrar contraseña' : '🙈 Ocultar contraseña';
    });
}

// ==========================================
// 3. VALIDACIÓN DE REQUISITOS DE CONTRASEÑA
// ==========================================
const reqLongitud = document.getElementById('longitud');
const reqMayuscula = document.getElementById('mayuscula');
const reqMinuscula = document.getElementById('minuscula');
const reqNumero = document.getElementById('numero');
const reqEspecial = document.getElementById('especial');

function validarPasswordCampos(inputPass, inputRepetir, btnEnviar) {
    if (!inputPass) return;

    const pass = inputPass.value;
    const passRepetir = inputRepetir ? inputRepetir.value : '';

    const tieneLongitud = pass.length >= 8;
    const tieneMayuscula = /[A-Z]/.test(pass);
    const tieneMinuscula = /[a-z]/.test(pass);
    const tieneNumero = /[0-9]/.test(pass);
    const tieneEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);

    actualizarRequisito(reqLongitud, tieneLongitud, "Mínimo 8 caracteres");
    actualizarRequisito(reqMayuscula, tieneMayuscula, "Una letra mayúscula");
    actualizarRequisito(reqMinuscula, tieneMinuscula, "Una letra minúscula");
    actualizarRequisito(reqNumero, tieneNumero, "Un número");
    actualizarRequisito(reqEspecial, tieneEspecial, "Un símbolo especial");

    const todoValido = tieneLongitud && tieneMayuscula && tieneMinuscula && tieneNumero && tieneEspecial && (pass === passRepetir);
    
    if (btnEnviar) {
        btnEnviar.disabled = !todoValido;
    }
}

function actualizarRequisito(elemento, valido, texto) {
    if (elemento) {
        if (valido) {
            elemento.textContent = `✅ ${texto}`;
            elemento.style.color = "#2e7d32";
        } else {
            elemento.textContent = `❌ ${texto}`;
            elemento.style.color = "";
        }
    }
}

// Escuchar cambios en Registro
const repetirPassword = document.getElementById('repetirPassword');
const btnRegistrar = document.getElementById('btnRegistrar');

if (passwordRegistro) {
    passwordRegistro.addEventListener('input', () => validarPasswordCampos(passwordRegistro, repetirPassword, btnRegistrar));
}
if (repetirPassword) {
    repetirPassword.addEventListener('input', () => validarPasswordCampos(passwordRegistro, repetirPassword, btnRegistrar));
}

// Escuchar cambios en Recuperar Contraseña
const repetirNuevaPassword = document.getElementById('repetirNuevaPassword');
const btnCambiar = document.getElementById('btnCambiar');

if (nuevaPassword) {
    nuevaPassword.addEventListener('input', () => validarPasswordCampos(nuevaPassword, repetirNuevaPassword, btnCambiar));
}
if (repetirNuevaPassword) {
    repetirNuevaPassword.addEventListener('input', () => validarPasswordCampos(nuevaPassword, repetirNuevaPassword, btnCambiar));
}