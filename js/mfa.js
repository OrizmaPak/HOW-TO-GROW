document.addEventListener('DOMContentLoaded', () => {
  const otpInputs  = [...document.querySelectorAll('input[inputmode="numeric"]')];
  const submitBtn  = document.querySelector('button[type="submit"]');
  const form       = document.querySelector('form');
  const resendLink = document.querySelector('a[href="#"]');
  const emailField = document.getElementById('indexEmail');
  const RESEND_SECS = 60;

  document.getElementById('displayEmail').textContent = emailField.value;

  otpInputs.forEach((el, idx) => {
    el.addEventListener('input', e => {
      e.target.value = e.target.value.replace(/\D/g, '').slice(-1);
      if (e.target.value && idx < otpInputs.length - 1) otpInputs[idx + 1].focus();
      toggleButton();
    });
    el.addEventListener('keydown', e => {
      if (e.key === 'Backspace' && !e.target.value && idx > 0) {
        otpInputs[idx - 1].focus();
      }
    });
    el.addEventListener('paste', e => {
      e.preventDefault();
      const data = (e.clipboardData || window.clipboardData)
        .getData('text').replace(/\D/g, '');
      if (data.length === otpInputs.length) {
        otpInputs.forEach((input, i) => input.value = data[i]);
        otpInputs[otpInputs.length - 1].focus();
        toggleButton();
      }
    });
  });

  function toggleButton() {
    submitBtn.disabled = otpInputs.some(i => !i.value);
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const code = otpInputs.map(i => i.value).join('');
    const formData = new FormData();
    formData.append('otp', code);
    formData.append('email', emailField.value);

    try {
      const res = await fetch('../controllers/mfaverify.php', {
        method: 'POST',
        body: formData
      });
      if (!res.ok) throw new Error('Server error');

      const json = await res.json();

      if (json.status) {
        await Swal.fire({
          icon: 'success',
          title: 'Verified',
          text: 'Your OTP has been verified.',
          confirmButtonText: 'Continue'
        });
        window.location.href = './index.php';
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: json.message || 'Invalid code',
          confirmButtonText: 'Try Again'
        });
        clearInputs();
      }
    } catch (err) {
      console.error(err);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong. Please try again.',
        confirmButtonText: 'OK'
      });
    }
  });

  function clearInputs() {
    otpInputs.forEach(i => i.value = '');
    otpInputs[0].focus();
    toggleButton();
  }

  // Resend countdown
  let secondsLeft = RESEND_SECS;
  startResendTimer();

  function startResendTimer() {
    resendLink.classList.add('pointer-events-none', 'opacity-50');
    resendLink.textContent = `Resend in ${secondsLeft}s`;
    const tick = setInterval(() => {
      secondsLeft--;
      resendLink.textContent = `Resend in ${secondsLeft}s`;
      if (secondsLeft <= 0) {
        clearInterval(tick);
        resendLink.textContent = 'Resend OTP';
        resendLink.classList.remove('pointer-events-none', 'opacity-50');
        resendLink.addEventListener('click', handleResend, { once: true });
      }
    }, 1000);
  }

  async function handleResend(e) {
    e.preventDefault();
    try {
      await fetch('/resend-otp', { method: 'POST' });
      await Swal.fire({
        icon: 'info',
        title: 'Sent',
        text: 'A new code has been sent.',
        timer: 2000,
        showConfirmButton: false
      });
    } catch {
      await Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'Could not resend code. Try again later.'
      });
      return;
    }
    secondsLeft = RESEND_SECS;
    startResendTimer();
  }
});
