const client = window.supabase.createClient(
  "https://qniilbvfmnwggaisotju.supabase.co",
  "sb_publishable_Wm-I_G_LSc5vHPx3vrf7Ow_FUdidRFZ"
);

document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const celular = document.getElementById("celular").value;
  const email = document.getElementById("email").value;

  const { error } = await client
    .from("pacientes")
    .insert([{ nome, celular, email }]);

  if (error) {
    alert("Erro ao cadastrar!");
    console.log(error);
  } else {
    document.getElementById("mensagem").style.display = "block";
    document.getElementById("form").reset();
  }
});