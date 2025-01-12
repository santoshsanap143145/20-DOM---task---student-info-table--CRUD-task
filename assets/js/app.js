const cl = console.log;

const stdFrom = document.getElementById("stdFrom");
const stdContainer = document.getElementById("stdContainer");

const fnameControl = document.getElementById("fname");
const lnameControl = document.getElementById("lname");
const emailControl = document.getElementById("email");
const contactControl = document.getElementById("contact");

const submitBtn = document.getElementById("submitBtn");
const updateBtn = document.getElementById("updateBtn");

const generateUuid = () => {
  return String("xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx").replace(
    /[xy]/g,
    (character) => {
      const random = (Math.random() * 16) | 0;
      const value = character === "x" ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    }
  );
};

const alertNote = (icon, msg) => {
  Swal.fire({
    position: "center",
    icon: icon,
    title: msg,
    showConfirmButton: true,
    timer: 1500,
  });
};

const stdArray = JSON.parse(localStorage.getItem("stdArr")) || [
  {
    fname: "Ramesh",
    lname: "Wagh",
    email: "rw@gmail.com",
    contact: 8456256354,
    id: generateUuid(),
  },
  {
    fname: "Suresh",
    lname: "Deshmukh",
    email: "sureshd@gmail.com",
    contact: 9656256354,
    id: generateUuid(),
  },
];

const editOnClick = (ele) => {
  let editId = ele.closest("tr").id;
  localStorage.setItem("editId", editId);
  let editStd = stdArray.find((std) => std.id === editId);
  fnameControl.value = editStd.fname;
  lnameControl.value = editStd.lname;
  emailControl.value = editStd.email;
  contactControl.value = editStd.contact;
  submitBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
};

const removeOnClick = (ele) => {
  let removeId = ele.closest("tr").id;

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      let getIndex = stdArray.findIndex((std) => std.id === removeId);
      stdArray.splice(getIndex, 1);
      localStorage.setItem("stdArr", JSON.stringify(stdArray));
      ele.closest("tr").remove();
      let stdRow = document.querySelectorAll(".stdRow");
      stdRow.forEach((row, i) => (row.children[0].innerHTML = i + 1));
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
};

const templatingStdInfo = (array = stdArray) => {
  result = "";
  array.forEach((std, i) => {
    result += `<tr id="${std.id}" class="stdRow">
                  <td>${i + 1}</td>
                  <td>${std.fname}</td>
                  <td>${std.lname}</td>
                  <td>${std.email}</td>
                  <td>${std.contact}</td>
                  <td>
                    <button class="btn btn-sm btn-outline-dark" onclick="editOnClick(this)">
                      Edit
                    </button>
                  </td>
                  <td>
                    <button class="btn btn-sm btn-outline-danger" onclick="removeOnClick(this)">
                      Remove
                    </button>
                  </td>
                </tr>`;
  });
  stdContainer.innerHTML = result;
};
templatingStdInfo();

const submitStdOnClick = (eve) => {
  eve.preventDefault();
  let newStd = {
    fname: fnameControl.value,
    lname: lnameControl.value,
    email: emailControl.value,
    contact: contactControl.value,
    id: generateUuid(),
  };
  stdFrom.reset();

  stdArray.push(newStd);
  localStorage.setItem("stdArr", JSON.stringify(stdArray));
  let newRow = document.createElement("tr");
  newRow.className = "stdRow";
  newRow.id = newStd.id;
  newRow.innerHTML = `<td>${stdArray.length}</td>
                        <td>${newStd.fname}</td>
                        <td>${newStd.lname}</td>
                        <td>${newStd.email}</td>
                        <td>${newStd.contact}</td>
                        <td>
                            <button class="btn btn-sm btn-outline-dark" onclick="editOnClick(this)">
                                Edit
                            </button>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-outline-danger" onclick="removeOnClick(this)">
                                Remove
                            </button>
                    </td>`;
  stdContainer.append(newRow);
  alertNote(
    "success",
    `New Student "${newStd.fname} ${newStd.lname}" is Added Successfuly !!!`
  );
};

const updateStdOnClick = () => {
  const updateId = localStorage.getItem("editId");
  const updatedStd = {
    fname: fnameControl.value,
    lname: lnameControl.value,
    email: emailControl.value,
    contact: contactControl.value,
    id: updateId,
  };
  stdFrom.reset();
  const getIndex = stdArray.findIndex((std) => std.id === updateId);
  stdArray[getIndex] = updatedStd;
  localStorage.setItem("stdArray", JSON.stringify(stdArray));
  const trRow = document.getElementById(updateId);
  trRow.children[1].innerHTML = updatedStd.fname;
  trRow.children[2].innerHTML = updatedStd.lname;
  trRow.children[3].innerHTML = updatedStd.email;
  trRow.children[4].innerHTML = updatedStd.contact;
  submitBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");
  alertNote(
    "success",
    `Student "${updatedStd.fname} ${updatedStd.lname}" is Updated Successfuly !!!`
  );
};

stdFrom.addEventListener("submit", submitStdOnClick);
updateBtn.addEventListener("click", updateStdOnClick);
