<?php
session_start();
if (!isset($_SESSION['user_id'])) {
  header('Location: login.php');
  exit;
}
$_SESSION['email'] = $_SESSION['htguseremail'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify OTP</title>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

  <!-- Tailwind via CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: { sans: ['Montserrat', 'sans-serif'] },
          colors: { primary: '#027a3e' },
          boxShadow: { glass: '0 25px 50px -12px rgba(0,0,0,0.25)' },
        },
      },
    };
  </script>

  <!-- Montserrat -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap"
    rel="stylesheet"
  />

  <style>
    /* Global dreamy backdrop */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background: radial-gradient(
        circle at 20% 30%,
        #d4ffe2 0%,
        #bfffd3 20%,
        #a6f7c2 40%,
        #5fd398 70%,
        #027a3e 100%
      );
      opacity: 0.25;
      z-index: -2;
    }
    body::after {
      content: '';
      position: fixed;
      inset: 0;
      background: url('https://www.transparenttextures.com/patterns/papyrus.png');
      opacity: 0.12;
      mix-blend-mode: overlay;
      z-index: -1;
    }
    /* Watermark inside OTP card */
    .otp-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: url('../images/WhatsApp Image 2023-01-05 at 08.21.50.jpeg')
        center/65% no-repeat;
      opacity: 0.05;
      pointer-events: none;
      z-index: -1;
    }
  </style>
</head>

<body
  class="min-h-screen flex items-center justify-center p-4 font-sans text-gray-800 leading-relaxed bg-gray-50"
>
  <!-- In a real app, replace this with your server‐rendered email -->
  <input type="hidden" id="indexEmail" value="<?=$_SESSION['email'];?>" />

  <section
    class="otp-card relative w-full max-w-md bg-white/60 backdrop-blur-lg backdrop-saturate-200 border border-white/40 rounded-2xl shadow-glass py-10 px-8"
  >
    <span
      class="absolute -top-8 -left-8 h-24 w-24 rounded-full bg-primary/20 blur-2xl"
    ></span>
    <span
      class="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-emerald-300/30 blur-3xl"
    ></span>

    <img
      src="../images/WhatsApp Image 2023-01-05 at 08.21.50.jpeg"
      alt="Company logo"
      class="mx-auto w-16 h-auto mb-4 rounded-full shadow-md"
    />

    <h1 class="text-center text-2xl font-semibold mb-2">MFA</h1>
    <p class="text-center text-sm mb-8 text-gray-700">
      Enter the six-digit code sent to
      <span class="font-medium" id="displayEmail"><?=$_SESSION['email'];?></span>.
    </p>

    <form action="#" method="post" class="grid grid-cols-6 gap-3 mb-8">
      <!-- 6 inputs -->
      <input
        type="text"
        maxlength="1"
        inputmode="numeric"
        class="w-full aspect-square text-center text-xl font-semibold border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/40 transition"
      />
      <input
        type="text"
        maxlength="1"
        inputmode="numeric"
        class="w-full aspect-square text-center text-xl font-semibold border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/40 transition"
      />
      <input
        type="text"
        maxlength="1"
        inputmode="numeric"
        class="w-full aspect-square text-center text-xl font-semibold border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/40 transition"
      />
      <input
        type="text"
        maxlength="1"
        inputmode="numeric"
        class="w-full aspect-square text-center text-xl font-semibold border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/40 transition"
      />
      <input
        type="text"
        maxlength="1"
        inputmode="numeric"
        class="w-full aspect-square text-center text-xl font-semibold border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/40 transition"
      />
      <input
        type="text"
        maxlength="1"
        inputmode="numeric"
        class="w-full aspect-square text-center text-xl font-semibold border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/40 transition"
      />
      <button
        type="submit"
        disabled
        class="w-full py-3 col-span-6 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold tracking-wide transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Confirm Code
      </button>
    </form>

    <p class="mt-6 text-center text-sm">
      Didn’t get the code?
      <a
        href="#"
        class="text-primary font-medium hover:underline"
      >
        Resend OTP
      </a>
    </p>
  </section>

  <script src="./js/mfa.js"></script>
</body>
</html>
