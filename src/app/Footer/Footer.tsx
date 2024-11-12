export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-neutral p-10 text-neutral-content">
        <div className="m-auto max-w-7xl text-center">
          <p>Projeto Integrador Transdisciplinar Em Ciência Da Computação II</p>
          <p>Feito por Christopher de Oliveira e Jemima Pires</p>
          <p>Copyright &copy; {currentYear}</p>
        </div>
      </footer>
    </>
  );
}
