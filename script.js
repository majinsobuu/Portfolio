document.addEventListener("DOMContentLoaded", function () {
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const documentContainer = document.getElementById("document-downloads");
  const privateDocumentsSection = document.getElementById("downloads");

  const documents = [
    {
      label: "Resume",
      description: "Latest CV and professional profile",
      href: "documents/resume/Ejekwu Suobulachi Harold Resume.pdf",
      fileName: "Ejekwu-Suobulachi-Harold-Resume.pdf",
    },
    {
      label: "Certifications",
      description: "Upload certificates to this folder and update the link anytime",
      href: "documents/certifications/README.md",
      fileName: "certification-guide.md",
    },
  ];

  if (!documentContainer || !privateDocumentsSection) {
    return;
  }

  const availableDocuments = [];

  const checkDocumentAvailability = (documentItem) => {
    return fetch(documentItem.href, { method: "HEAD" })
      .then((response) => response.ok)
      .catch(() => false);
  };

  Promise.all(documents.map((documentItem) => checkDocumentAvailability(documentItem)))
    .then((results) => {
      results.forEach((isAvailable, index) => {
        if (isAvailable) {
          availableDocuments.push(documents[index]);
        }
      });

      if (availableDocuments.length === 0) {
        privateDocumentsSection.style.display = "none";
        return;
      }

      availableDocuments.forEach((documentItem) => {
        const link = document.createElement("a");
        link.href = documentItem.href;
        link.className = "doc-item";
        link.download = documentItem.fileName;
        link.setAttribute("aria-label", `Download ${documentItem.label}`);
        link.innerHTML = `
          <strong>${documentItem.label}</strong>
          <span>${documentItem.description}</span>
        `;
        documentContainer.appendChild(link);
      });
    })
    .catch(() => {
      privateDocumentsSection.style.display = "none";
    });
});
