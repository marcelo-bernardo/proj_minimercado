(() => {
    'use strict';
  
    const forms = document.querySelectorAll('form.needs-validation');
  
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          event.preventDefault(); // Impede reload
  
          const nomeProduto = form.querySelector('[data-produto]').value || 'Produto';
          const quantidade = form.querySelector('[type="number"]').value || 1;
  
          showAlert(`✅ <strong>${quantidade}</strong> unidade(s) de <strong>${nomeProduto}</strong> adicionada(s) ao carrinho.`, 'success');
          atualizarCarrinho(quantidade);
  
          form.reset();
          form.classList.remove('was-validated');
        }
  
        form.classList.add('was-validated');
      }, false);
    });
  })();
  
  // Botões de mais/menos
  document.querySelectorAll('.btn-mais').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.parentElement.querySelector('input');
      input.value = parseInt(input.value) + 1;
    });
  });
  
  document.querySelectorAll('.btn-menos').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.parentElement.querySelector('input');
      const current = parseInt(input.value);
      if (current > 1) input.value = current - 1;
    });
  });
  
  // Alerta com Bootstrap
  function showAlert(message, type = 'info') {
    const alertPlaceholder = document.getElementById('alert-placeholder');
    if (!alertPlaceholder) return;
  
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show mt-3" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>
      </div>
    `;
  
    alertPlaceholder.append(wrapper);
  
    setTimeout(() => {
      wrapper.remove();
    }, 5000);
  }
  
  // Atualiza contador do carrinho na nav
  function atualizarCarrinho(qtd) {
    const badge = document.getElementById('cart-count');
    const atual = parseInt(badge.textContent) || 0;
    badge.textContent = atual + parseInt(qtd);
  }

  
//Navegação NAV
  document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.navbar a[data-link]');
  
    navLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
  
        // Se for âncora interna da página
        if (href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
  
        // Se for outra página (ex: sobre.html)
        else if (href.endsWith('.html')) {
          // Aqui você pode colocar uma confirmação ou alerta
          const confirmNav = confirm('Você será redirecionado para outra página. Deseja continuar?');
          if (!confirmNav) {
            e.preventDefault();
          }
        }
      });
    });
  });
  

  function ativar(linkClicado) {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => link.classList.remove('active'));
    linkClicado.classList.add('active');
  }