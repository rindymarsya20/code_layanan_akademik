/* Menu samping untuk layar kecil. Tanpa JavaScript, menu tetap tampil sebagai baris tautan biasa. */
(function () {
  var tombolBuka = document.querySelector('.menu-buka');
  var menu = document.getElementById('menu-utama');
  var tombolTutup = document.querySelector('.menu-tutup');
  var scrim = document.querySelector('.scrim');
  if (!tombolBuka || !menu || !tombolTutup || !scrim) return;

  var layarLebar = window.matchMedia('(min-width: 56rem)');

  function buka() {
    menu.classList.add('terbuka');
    document.body.classList.add('menu-terbuka');
    tombolBuka.setAttribute('aria-expanded', 'true');
    tombolTutup.focus();
  }

  function tutup(kembaliFokus) {
    menu.classList.remove('terbuka');
    document.body.classList.remove('menu-terbuka');
    tombolBuka.setAttribute('aria-expanded', 'false');
    if (kembaliFokus) tombolBuka.focus();
  }

  tombolBuka.addEventListener('click', buka);
  tombolTutup.addEventListener('click', function () { tutup(true); });
  scrim.addEventListener('click', function () { tutup(true); });

  // Tautan di dalam menu menutup menu, lalu halaman menggulir ke bagian tujuan
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) tutup(false);
  });

  document.addEventListener('keydown', function (e) {
    if (!menu.classList.contains('terbuka')) return;
    if (e.key === 'Escape') { tutup(true); return; }
    if (e.key !== 'Tab') return;
    // Fokus tetap berputar di dalam menu selama terbuka
    var fokusable = menu.querySelectorAll('a[href], button');
    var pertama = fokusable[0];
    var terakhir = fokusable[fokusable.length - 1];
    if (e.shiftKey && document.activeElement === pertama) { e.preventDefault(); terakhir.focus(); }
    else if (!e.shiftKey && document.activeElement === terakhir) { e.preventDefault(); pertama.focus(); }
  });

  // Bila layar membesar, kembalikan ke navigasi biasa
  layarLebar.addEventListener('change', function (e) {
    if (e.matches) tutup(false);
  });
})();
