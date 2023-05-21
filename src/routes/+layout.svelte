<script>
  import "../app.css";
  import "@fontsource/raleway";
  import deer from '$lib/images/deer.png';

  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
  import { Footer, FooterCopyright, FooterLink, FooterLinkGroup } from "flowbite-svelte";
  import { page } from '$app/stores';

  export let data;

  function logout() {
    document.getElementById("logout").submit();
  }
</script>

<div class="flex flex-col min-h-full">
  <Navbar let:hidden let:toggle>
    <NavBrand href="/">
      <img src={deer} class="mr-3 h-9" alt="CaribExchange Logo" />
      <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
        CaribExchange
      </span>
    </NavBrand>
    <NavHamburger on:click={toggle} />
    <NavUl {hidden}>
      <NavLi href="/" active={$page.url.pathname === '/'}>Home</NavLi>
      <NavLi href="#">About</NavLi>
      <NavLi href="#">Contact</NavLi>
      {#if data.loggedIn}
      <form id="logout" method="POST" action="/login?/logout">
        <NavLi class="text-red-500" href="#" on:click={logout}>Logout</NavLi>
      </form>
      {/if}
    </NavUl>
  </Navbar>

  <main class="flex-grow">
    <slot />
  </main>

  <Footer>
    <FooterCopyright href="https://github.com/simchev" by="Simon Chevrier" year={2023} />
    <FooterLinkGroup ulClass="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
      <FooterLink href="#">About</FooterLink>
      <FooterLink href="#">Privacy Policy</FooterLink>
      <FooterLink href="#">Licensing</FooterLink>
      <FooterLink href="#">Contact</FooterLink>
    </FooterLinkGroup>
  </Footer>
</div>