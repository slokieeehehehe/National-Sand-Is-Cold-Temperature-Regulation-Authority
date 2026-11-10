
const landing = document.getElementById("landing");
const formSection = document.getElementById("formSection");
const terminalSection = document.getElementById("terminalSection");
const resultSection = document.getElementById("resultSection");

const form = document.getElementById("subjectForm");
const fieldCount = document.getElementById("fieldCount");

const terminalLog = document.getElementById("terminalLog");
const progressBar = document.getElementById("progressBar");

const reportBody = document.getElementById("reportBody");

const beginButton = document.getElementById("beginButton");
const generateButton = document.getElementById("generateButton");
const printButton = document.getElementById("printButton");
const restartButton = document.getElementById("restartButton");

const fieldIds = [
  "legalName",
  "dob",
  "colour",
  "subject",
  "food",
  "hobbies",
  "achievement",
  "fear",
  "regret",
  "phrase",
  "contribution",
  "message",
  "personalStatement"
];

const getValue = (id) => {
  return document.getElementById(id).value.trim();
};

function showSection(section) {
  landing.classList.add("hidden");
  formSection.classList.add("hidden");
  terminalSection.classList.add("hidden");
  resultSection.classList.add("hidden");

  section.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

beginButton.addEventListener("click", () => {
  showSection(formSection);
});

/* --------------------------------
   LIVE COMMENTARY FOR EACH FIELD
-------------------------------- */

function getCommentary(id, value) {
  const answer = value.trim();
  const lower = answer.toLowerCase();

  if (!answer) {
    const emptyResponses = {
      legalName: "Identity conveniently disappears when accountability arrives.",
      dob: "The Authority cannot verify a subject who refuses to disclose a date.",
      colour: "No colour selected. Even your preferences are indecisive.",
      subject: "Academic interests remain unclassified.",
      food: "The Authority is waiting to reject your answer.",
      hobbies: "An empty hobby list. A concerning development.",
      achievement: "No achievements detected. This is not entirely surprising.",
      fear: "The Authority is beginning to suspect that the answer is the Authority.",
      regret: "There is a suspicious absence of self-reflection here.",
      phrase: "The subject has temporarily run out of words.",
      contribution: "Society confirms that it is still waiting.",
      message: "A blank message. Finally, a sensible contribution.",
      personalStatement: "Nothing to add. Your silence has been provisionally accepted."
    };

    return emptyResponses[id] || "Awaiting further evidence.";
  }

  switch (id) {
    case "legalName":
      return "Identity received. The Authority has forwarded the name to the Department of Excessive Nonsense. Even the database has requested clarification.";

    case "dob":
      return "Date recorded. Another year has passed, and somehow the situation remains largely unchanged. Time has done its part. You have not.";

    case "colour":
      return "Colour recorded as " + answer + ". Reliability of this preference is questionable, given the subject's well-documented tendency to turn red and deny absolutely everything whenever Nirvi is nearby.";

    case "subject":
      switch (answer) {
        case "English":
          return "English selected. Interesting. Is this somehow connected to Lilly Thomas? HAW. The Authority requests an explanation before this becomes a literary investigation.";

        case "Maths":
          return "Mathematics selected. The Authority is genuinely proud of you. Please do not let this brief moment of institutional approval affect your already questionable personality.";

        case "Biology":
          return "Biology selected. Excellent. A scientifically respectable choice. The Authority has decided to overlook several unrelated deficiencies in recognition of this rare academic achievement.";

        case "Chemistry":
          return "Chemistry selected. Very respectable. The Authority is proud of you. Please use your knowledge responsibly and do not attempt to chemically explain your personality.";

        case "Physics":
          return "Physics selected. Your judgement remains questionable, but at least your preference for Biology is commendable. The Authority will be monitoring this academic confusion.";

        case "Spanish":
          return "Spanish selected. The Authority acknowledges your commitment to language learning. It recommends further study, fewer questionable academic decisions, and a personality that extends beyond conjugating verbs.";

        case "Other":
          return "Other selected. The Authority has determined that Homicidology is the only academically appropriate field for the subject's continued investigation. This is not an endorsement of your academic judgement.";

        default:
          return "Academic classification pending.";
      }

    case "food":
      return "Your answer, \"" + answer + "\", has been reviewed and rejected. The only acceptable answer is PROLYTE ORS. The Authority is not accepting appeals, substitutions, or emotional arguments.";

    case "hobbies":
      return "Hobbies recorded. The Authority notes that Spanish and piano appear to be your only identifiable personality traits. You seem to think these are impressive. They are not. They are simply activities you participate in, not a substitute for developing an actual personality.";

    case "achievement":
      return "Achievement submitted. The Authority has cross-checked the claim against independent witnesses and has concluded that your greatest achievement remains the fact that Nivedita and Nirvi continue to tolerate you. This is a remarkable demonstration of patience on their part.";

    case "fear":
      return "Fear recorded. The Authority has forwarded this information to the Department of Unnecessary Psychological Observations. Your answer will be treated with the same seriousness you apply to your responsibilities: inconsistently.";

    case "regret":
      return "Regret registered. The Authority recommends reviewing your past decisions, although it acknowledges that this could require an unreasonable amount of administrative time.";

    case "phrase":
      return "Phrase recorded. The Authority has determined that repeated use of this expression does not make it more intelligent, more original, or more tolerable. Please consider expanding your vocabulary.";

    case "contribution":
      return "Contribution received. Chehal has been contacted for independent verification. Devansh has also been mentioned in the inquiry, primarily because the Authority believes he may be involved in the general confusion surrounding this subject.";

    case "message":
      return "Message successfully received. It has been forwarded to the relevant department, where it will be examined, misinterpreted, and eventually filed under 'Things Rajveer Thought Were Important'.";

    case "personalStatement":
      return "Your statement has been received. The Authority appreciates your willingness to share. It does not necessarily appreciate the content. Nevertheless, it has been archived for the final report.";

    default:
      return "Input recorded. The Authority remains unimpressed.";
  }
}

function updateLiveCommentary(id) {
  const element = document.getElementById(id);
  const response = document.querySelector(`[data-response="${id}"]`);

  if (!element || !response) return;

  response.textContent = getCommentary(id, element.value);
}

function updateFieldCount() {
  let completed = 0;

  fieldIds.forEach(id => {
    if (getValue(id)) completed++;
  });

  fieldCount.textContent =
    String(completed).padStart(2, "0") +
    " / 13 FIELDS";
}

fieldIds.forEach(id => {
  const element = document.getElementById(id);

  element.addEventListener("input", () => {
    updateLiveCommentary(id);
    updateFieldCount();
  });

  element.addEventListener("change", () => {
    updateLiveCommentary(id);
    updateFieldCount();
  });

  updateLiveCommentary(id);
});

updateFieldCount();

/* --------------------------------
   REPORT HELPERS
-------------------------------- */

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function quotedAnswer(label, value) {
  const safeValue = escapeHTML(value || "No response supplied.");

  return `
    <h3>${escapeHTML(label)}</h3>
    <p class="quoted-answer">"${safeValue}"</p>
  `;
}

/* --------------------------------
   LONG-FORM INVESTIGATIVE REPORT
-------------------------------- */

function generateReport(data) {
  const name = escapeHTML(data.legalName);
  const dob = escapeHTML(data.dob);
  const colour = escapeHTML(data.colour);
  const subject = escapeHTML(data.subject);
  const food = escapeHTML(data.food);
  const hobbies = escapeHTML(data.hobbies);
  const achievement = escapeHTML(data.achievement);
  const fear = escapeHTML(data.fear);
  const regret = escapeHTML(data.regret);
  const phrase = escapeHTML(data.phrase);
  const contribution = escapeHTML(data.contribution);
  const message = escapeHTML(data.message);
  const personal = escapeHTML(data.personalStatement || "No additional statement supplied.");

  const personalSection = data.personalStatement
    ? `
      <p>
        The Authority has also received an additional statement from the
        subject. This statement was voluntarily submitted despite the
        Authority making no representation whatsoever that it was interested.
        The subject was nevertheless permitted to speak, and the statement
        has been preserved below for administrative completeness.
      </p>
      ${quotedAnswer("ADDITIONAL STATEMENT", data.personalStatement)}
      <p>
        Following careful consideration, the Authority has decided that
        the statement does not alter the subject's classification. It is,
        however, evidence that the subject was given an opportunity to
        express himself and chose to use it. This is being treated as a
        minor administrative success.
      </p>
    `
    : `
      <p>
        The subject declined to provide an additional statement. The Authority
        respects this decision in the limited sense that it has no intention
        of chasing the subject for further commentary. The absence of a
        statement has been recorded and will not improve the final assessment.
      </p>
    `;

  return `
    <p>
      <strong>TO WHOM IT MAY CONCERN, AND PARTICULARLY THE SUBJECT:</strong>
    </p>

    <p>
      Following the completion of Form NS-15, the National Sand Is Cold
      Temperature Regulation Authority has conducted a comprehensive review
      of the individual identified in the records as
      <strong>${name}</strong>. The investigation was initiated on the
      occasion of the subject's birthday, although the Authority wishes to
      clarify that the mere passage of time does not constitute evidence of
      personal development, maturity, responsibility, or any other quality
      the subject may be tempted to claim.
    </p>

    <p>
      The subject's date of birth has been recorded as <strong>${dob}</strong>.
      This information confirms that another year has elapsed. It does not,
      unfortunately, confirm that another year of wisdom has been acquired.
      The Authority has reviewed the available evidence and considers the
      distinction between growing older and becoming more sensible to be
      particularly relevant in this case.
    </p>

    <h3>01 / IDENTITY AND GENERAL CLASSIFICATION</h3>

    <p>
      The submitted identity has been entered into the central records.
      The Authority notes that the name itself appears to contain more
      unnecessary material than several complete government databases.
      Its length has been classified as excessive, its practical utility
      as negligible, and its contribution to ordinary conversation as
      actively questionable. The subject is advised that a complicated
      name does not automatically indicate a complicated or impressive
      individual.
    </p>

    <h3>02 / PERSONAL PREFERENCES AND COLOUR-RELATED IRREGULARITIES</h3>

    <p>
      The subject identified <strong>${colour}</strong> as a favourite
      colour. This answer has been accepted for record-keeping purposes
      only. The Authority has reservations about the reliability of the
      subject's preferences, particularly in light of the recurring
      phenomenon in which the subject turns red and subsequently denies
      everything whenever Nirvi is in the vicinity. The Department of
      Colour Verification has therefore marked this response as
      provisionally unreliable.
    </p>

    <h3>03 / ACADEMIC OBSERVATIONS</h3>

    <p>
      When asked to identify a favourite subject, the individual selected
      <strong>${subject}</strong>. The Authority has recorded the response
      and applied the appropriate level of scrutiny. Academic preferences
      are acknowledged as personal choices; however, they do not grant
      immunity from unrelated personality assessments. The Authority
      encourages the subject to continue studying, preferably with the
      same consistency with which he appears to defend his questionable
      decisions.
    </p>

    <h3>04 / NUTRITIONAL JUDGEMENT</h3>

    <p>
      The subject declared <strong>${food}</strong> to be his favourite
      food. This declaration has been formally rejected. The Authority
      reiterates that PROLYTE ORS is the only acceptable answer under
      the current regulations. No alternative food item, regardless of
      taste, nutritional value, cultural significance, or personal
      attachment, shall be recognised as a valid response. The subject
      may disagree, but the Authority has already made its decision.
    </p>

    <h3>05 / HOBBIES, INTERESTS AND THE ABSENCE OF A PERSONALITY</h3>

    <p>
      The subject listed <strong>${hobbies}</strong> as his hobbies.
      The Authority has examined this response and identified a recurring
      dependence on Spanish and piano as the subject's primary identifiable
      personality traits. While these are perfectly acceptable activities,
      the subject appears to regard them as evidence of exceptional
      sophistication. The Authority wishes to clarify that knowing another
      language and playing an instrument are not substitutes for having
      an interesting personality. They are hobbies. Please adjust your
      expectations accordingly.
    </p>

    <h3>06 / CLAIMED ACHIEVEMENTS</h3>

    <p>
      The subject's stated greatest achievement was:
      <strong>${achievement}</strong>. This claim has been forwarded for
      independent verification. However, the Authority's preliminary
      findings continue to support a different conclusion: the subject's
      most impressive achievement is that Nivedita and Nirvi still
      tolerate him. Their patience has been recognised as an exceptional
      public service, and the Authority is considering issuing separate
      appreciation notices to both individuals. The subject is advised
      not to interpret their tolerance as proof that his behaviour is
      universally acceptable.
    </p>

    <h3>07 / FEAR, REGRET AND SELF-REFLECTION</h3>

    <p>
      The subject identified <strong>${fear}</strong> as his greatest fear
      and <strong>${regret}</strong> as his greatest regret. These responses
      have been added to the psychological observations file, which is
      already considerably longer than anticipated. The Authority
      recommends that the subject engage in occasional self-reflection.
      It is understood that this may be an unfamiliar administrative
      procedure, but the Department remains hopeful.
    </p>

    <h3>08 / LINGUISTIC CONTRIBUTIONS</h3>

    <p>
      The subject identified <strong>${phrase}</strong> as his most-used
      phrase. The Authority has recorded this information for linguistic
      analysis. Repetition does not automatically produce wit, originality,
      intelligence, or social value. The subject is encouraged to consider
      whether the phrase is genuinely necessary every time it is used.
      The answer, in most cases, is likely to be no.
    </p>

    <h3>09 / CONTRIBUTION TO SOCIETY</h3>

    <p>
      When asked to identify his most significant contribution to society,
      the subject submitted the following:
    </p>

    ${quotedAnswer("SUBJECT'S CLAIMED CONTRIBUTION", data.contribution)}

    <p>
      This claim has been sent to Chehal for independent verification.
      Devansh has also been mentioned in the inquiry, owing to the
      Authority's suspicion that he may have contributed to the general
      confusion surrounding the subject. Chehal's ongoing distribution
      of unsolicited information and strategically timed tea has been
      documented separately. The Authority has concluded that the subject's
      social environment requires its own administrative department.
    </p>

    <h3>10 / DIRECT COMMUNICATION FROM THE SUBJECT</h3>

    <p>
      The subject was provided with an opportunity to address the Authority
      directly. The submitted communication is reproduced below:
    </p>

    ${quotedAnswer("MESSAGE TO THE AUTHORITY", data.message)}

    <p>
      The Authority confirms that the communication has been received.
      It does not confirm that the communication has been useful. It
      does not confirm that the communication has changed anything.
      It does not confirm that the subject's concerns have been given
      priority over the many other matters currently occupying the
      Department. The subject may take comfort in the fact that the
      message was, at the very least, opened.
    </p>

    ${personalSection}

    <h3>11 / GENERAL CONDUCT AND FINAL OBSERVATIONS</h3>

    <p>
      Having reviewed the submitted information, the Authority finds
      that the subject continues to demonstrate an unusual combination
      of confidence, questionable judgement, selective self-awareness,
      and an apparently limitless capacity to become involved in
      situations that could have been avoided with a little common sense.
      The subject has shown some evidence of academic participation,
      social functioning, and continued existence. These factors have
      been acknowledged, although none is sufficient to justify the
      subject's apparent confidence in his own abilities.
    </p>

    <p>
      The Authority further observes that Chehal and Devansh remain
      relevant figures in the subject's ongoing administrative history.
      Their names have appeared repeatedly in the records, often in
      circumstances that suggest the subject's life is being managed
      by an informal committee of people who have collectively decided
      that peace and quiet would be too much to ask for.
    </p>

    <p>
      The Department of Records has considered whether the subject should
      receive a reduction in his current classification. After extensive
      discussion, repeated consultation, and a brief but serious attempt
      to locate a reason to do so, the proposal was rejected. The subject
      remains exactly where the evidence suggests he belongs.
    </p>

    <h3>12 / FINAL DETERMINATION</h3>

    <p>
      In view of the foregoing, the National Sand Is Cold Temperature
      Regulation Authority hereby confirms the designation of the subject
      as <strong>CERTIFIED NALAYAK — LEVEL 15</strong>. This classification
      shall remain in effect regardless of any objections, appeals,
      explanations, attempts at negotiation, or claims of personal growth.
      The subject may continue to pursue his interests, maintain his
      friendships, study Spanish, play piano, and make an effort to
      become a marginally more tolerable member of society.
    </p>

    <p>
      The Authority wishes the subject a tolerable birthday and a year
      containing at least a modest amount of progress. This is not a
      guarantee. It is merely an administrative recommendation.
    </p>

    <p>
      Finally, the Authority would like to remind the subject that being
      another year older is a fact, not an accomplishment. The fact that
      this entire department has had to prepare such an extensive report
      about him is, in itself, a matter requiring further investigation.
      The case shall remain open.
    </p>

    <p>
      <strong>
        BY ORDER OF THE NATIONAL SAND IS COLD TEMPERATURE REGULATION AUTHORITY.
      </strong>
    </p>

    <p>
      <em>
        Happy Birthday, Rajveer. The Authority regrets to inform you that
        you remain a nalayak. No further correspondence is required.
      </em>
    </p>
  `;
}

/* --------------------------------
   SUBMISSION AND TERMINAL ANIMATION
-------------------------------- */

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runAudit(data) {
  showSection(terminalSection);

  terminalLog.innerHTML = "";
  progressBar.style.width = "0%";

  const logs = [
    "Opening subject record: NS-RAJ-2011-15...",
    "Verifying identity. The identity is, unfortunately, confirmed.",
    "Checking date of birth against the passage of time...",
    "Comparing claimed personality traits with available evidence...",
    "Consulting the Department of Spanish and Piano Excuses...",
    "Contacting Chehal for independent verification...",
    "Checking whether Devansh has been involved in this matter...",
    "Reviewing food preferences. PROLYTE ORS remains the only acceptable answer.",
    "Evaluating claimed achievements. Nivedita and Nirvi have been contacted.",
    "Reviewing additional personal statement, if supplied...",
    "Calculating NALAYAK classification...",
    "Classification confirmed: LEVEL 15.",
    "Generating final communication. Please prepare for disappointment."
  ];

  for (let i = 0; i < logs.length; i++) {
    const line = document.createElement("p");
    line.textContent = logs[i];
    terminalLog.appendChild(line);

    progressBar.style.width =
      ((i + 1) / logs.length * 100) + "%";

    await sleep(650);
  }

  await sleep(700);

  reportBody.innerHTML = generateReport(data);
  showSection(resultSection);
}

/* --------------------------------
   FORM SUBMISSION
-------------------------------- */

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const data = {};

  fieldIds.forEach(id => {
    data[id] = getValue(id);
  });

  await runAudit(data);
});

/* --------------------------------
   PRINT / RESTART
-------------------------------- */

printButton.addEventListener("click", () => {
  window.print();
});

restartButton.addEventListener("click", () => {
  form.reset();

  fieldIds.forEach(id => {
    updateLiveCommentary(id);
  });

  updateFieldCount();
  showSection(landing);
});
