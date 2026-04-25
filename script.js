const client = window.supabase.createClient(
  "https://qniilbvfmnwggaisotju.supabase.co",
  "sb_publishable_Wm-I_G_LSc5vHPx3vrf7Ow_FUdidRFZ"
);

let editandoId = null;

async function carregar() {
  const { data } = await client
    .from("pacientes")
    .select("*")
    .order("id");

  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  data.forEach((p) => {
    lista.innerHTML += `
      <div class="item">
        <b>${p.nome}</b><br>
        ${p.celular}<br>
        ${p.email}<br><br>

        <div class="acoes">
          <button class="edit" onclick="editar(${p.id}, '${p.nome}', '${p.celular}', '${p.email}')">Editar</button>
          <button class="del" onclick="excluir(${p.id})">Excluir</button>
        </div>
      </div>
    `;
  });
}

async function excluir(id) {
  await client.from("pacientes").delete().eq("id", id);
  carregar();
}

function editar(id, nome, celular, email) {
  editandoId = id;

  document.getElementById("nome").value = nome;
  document.getElementById("celular").value = celular;
  document.getElementById("email").value = email;

  document.querySelector("button[type=submit]").textContent = "Salvar Alterações";
}

document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const celular = document.getElementById("celular").value;
  const email = document.getElementById("email").value;

  if (editandoId) {
    await client
      .from("pacientes")
      .update({ nome, celular, email })
      .eq("id", editandoId);

    editandoId = null;
    document.querySelector("button[type=submit]").textContent = "Cadastrar";
  } else {
    await client
      .from("pacientes")
      .insert([{ nome, celular, email }]);

    document.getElementById("mensagem").style.display = "block";
  }

  document.getElementById("form").reset();
  carregar();
});

carregar();