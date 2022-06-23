let _permissions = {
  1: "Dono",
  2: "Adicionar Evento",
  4: "Editar Evento",
  8: "Excluir Evento",
  16: "Editar Membros",
  32: "Publicar",
  64: "Editar Publicações",
  128: "Excluir Publicações",
  256: "Editar Perfil",
};

let permissions_groups = {
  Organização: [256, 16],
  Evento: [2, 4, 8],
  Publicação: [32, 64, 128],
};

const hasPermission = (userPermissions, permission) =>
  userPermissions & (permission === permission);

module.exports = {
  _permissions,
  permissions_groups,
  hasPermission,
};
