export const AdvocateModel = (id, name, specialization, status) => ({
  id,
  name,
  specialization,
  status
});

export const CaseModel = (id, title, client, status, type) => ({
  id,
  title,
  client,
  status,
  type // e.g. Civil, Criminal
});

export const ApprovalModel = (id, title, requester, status, date) => ({
  id,
  title,
  requester,
  status,
  date
});
