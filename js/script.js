document.addEventListener("DOMContentLoaded", () => {
  /** ScrollTrigger, ScrollSmoother 등록 */
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  // ScrollSmoother 인스턴스를 변수에 저장
  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.3, // 기본 스크롤 부드러움 정도
    effects: true, // data-speed나 data-lag 사용 가능하게
    smoothTouch: 0.1, // 터치 디바이스에서 부드러움 정도
  });

  document.querySelectorAll(".header__menu-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // 기본 점프 막기

      const targetId = link.getAttribute("href"); // "#about"
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        // ScrollSmoother scrollTo
        ScrollSmoother.get().scrollTo(targetEl, {
          offsetY: 0, // 상단 여백 필요하면 px로 조절
          duration: 1.2, // 이동 시간 (초)
          ease: "power2.inOut", // 부드러운 easing
        });
      }
    });
  });

  /** 프로필 스크롤 이벤트 적용 */
  const slides = document.querySelectorAll(".about__boxes .swiper-slide");

  // 하나씩 애니메이션 적용
  gsap.fromTo(
    slides,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.3, // ← 딜레이 대신 stagger 사용
      scrollTrigger: {
        trigger: ".about__boxes",
        start: "top 70%",
      },
    }
  );

  /** 카드 스크롤 이벤트 적용 */
  const cards = document.querySelectorAll("#projectCards .project__card");

  // 각 카드에 애니메이션 적용
  cards.forEach((card, idx) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%", // 카드가 뷰포트 아래에서 올라올 때 시작
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 50,
      duration: 0.7,
      ease: "power2.out",
      delay: idx * 0.05, // 자연스러운 약간의 딜레이
    });
  });

  const topBtn = document.querySelector("#top-btn");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      // 스크롤이 100px 넘으면 on
      topBtn.classList.add("on");
    } else {
      // 스크롤이 100px 이하면 on을 없앰
      topBtn.classList.remove("on");
    }
  });

  topBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  /** 이메일 복사 버튼 */
  document.getElementById("copyEmail").addEventListener("click", () => {
    const email = "ywon0127@gmail.com";

    navigator.clipboard.writeText(email).then(() => {
      alert("이메일이 복사되었습니다!");
    });
  });

  /** 프로젝트 종류 필터링 */
  const projectCards = document.querySelectorAll(
    "#projectList .project__item, #projectCards .project__card"
  );

  const pjFilterBtns = document.querySelectorAll(
    "#projectsFilter .filter__btn"
  );

  pjFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      pjFilterBtns.forEach((b) => b.classList.remove("filter__btn--active"));
      btn.classList.add("filter__btn--active");

      const type = btn.dataset.type;

      projectCards.forEach((card) => {
        if (type === "all" || card.dataset.type === type) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  /**
   * 프로젝트 뷰 (카드형/리스트형) 전환 기능
   */
  const viewToggleBtns = document.querySelectorAll(".project__view-btn");

  const cardViewContainer = document.querySelector(".project__card-view");
  const listViewContainer = document.querySelector(".project__list-view");

  viewToggleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      viewToggleBtns.forEach((b) =>
        b.classList.remove("project__view-btn--active")
      );
      btn.classList.add("project__view-btn--active");

      const viewType = btn.dataset.view; // 'card' 또는 'list'

      if (viewType === "card") {
        // 카드 뷰 활성화
        if (cardViewContainer) {
          cardViewContainer.style.display = "block";
        }
        // 리스트 뷰 비활성화
        if (listViewContainer) {
          listViewContainer.style.display = "none";
        }
      } else if (viewType === "list") {
        // 리스트 뷰 활성화
        if (listViewContainer) {
          listViewContainer.style.display = "block";
        }
        // 카드 뷰 비활성화
        if (cardViewContainer) {
          cardViewContainer.style.display = "none";
        }
      }
    });
  });

  /**  progressBar 이벤트  */
  window.addEventListener("scroll", function () {
    const scrollTop = window.scrollY; // 현재 스크롤 위치
    const docHeight = document.body.scrollHeight - window.innerHeight; // 스크롤 가능한 전체 높이
    const scrollPercent = (scrollTop / docHeight) * 100; // 진행도 %
    const progressBar = document.getElementById("progressBar");
    progressBar.style.width = scrollPercent + "%";
  });

  /**  header--scrolled   */
  // header 스크롤 이벤트

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("header--scrolled");
    } else {
      header.classList.remove("header--scrolled");
    }
  });

  /** header (ScrollSmoother 환경 전용) */
  const header = document.querySelector(".header");
  const headerMenus = document.querySelectorAll(".header__menu-item");

  /** header menu 클릭 시 active + 부드러운 스크롤 */
  // 각 섹션과 메뉴 연결
  const sections = [];
  headerMenus.forEach((menu) => {
    const link = menu.querySelector(".header__menu-link");
    const targetId = link.getAttribute("href");
    const targetEl = document.querySelector(targetId);
    if (targetEl) sections.push({ menu, targetEl });
  });

  console.log(sections);

  /** 메뉴 클릭 시 부드러운 스크롤 */
  headerMenus.forEach((menu) => {
    const link = menu.querySelector(".header__menu-link");
    link.addEventListener("click", (e) => {
      e.preventDefault();

      smoother.scrollTo(document.querySelector(link.getAttribute("href")), {
        offsetY: 0, // 필요 시 header 높이만큼 조정
        duration: 1.2,
        ease: "power2.inOut",
      });
    });
  });

  var aboutSwiper = new Swiper(".about__swiper", {
    effect: "cards",
    grabCursor: true,
    // autoplay: {
    //   delay: 2000,
    //   disableOnInteraction: false,
    // },
  });

  /** 스킬 종류 필터링 */
  const skillFilterBtns = document.querySelectorAll(
    "#skillsFilter .filter__btn"
  );
  const skillCards = document.querySelectorAll(".skill__card");

  skillFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedType = btn.dataset.type;

      // 버튼 active
      skillFilterBtns.forEach((b) => b.classList.remove("filter__btn--active"));
      btn.classList.add("filter__btn--active");

      // 필터링 (선택 안된 카드)
      skillCards.forEach((card) => {
        if (selectedType === "all") {
          card.classList.remove("skill__card--dimmed");
          return;
        }

        const type = card.dataset.type;
        if (type === selectedType) {
          card.classList.remove("skill__card--dimmed");
        } else {
          card.classList.add("skill__card--dimmed");
        }
      });
    });
  });

  /** 프로젝트 전체화면 스크롤 기능 */
  const screenArea = document.querySelector(".screen-area");
  const screenshot = document.querySelector(".project-screenshot");

  // 현재 스크롤 위치를 추적할 변수 (초기 위치는 0)
  let currentScroll = 0;
  const scrollSpeed = 0.5; // 스크롤 속도 조절 계수 (숫자가 클수록 더 빨리 움직임)

  // 마우스 휠 이벤트 리스너를 screen-area에 연결합니다.
  screenArea.addEventListener(
    "wheel",
    (event) => {
      // 기본 브라우저 스크롤 동작을 막습니다. (주변 페이지가 스크롤되는 것을 방지)
      event.preventDefault();

      // 1. 이미지의 최대 스크롤 가능 높이를 계산합니다.
      const maxScrollHeight = screenshot.clientHeight - screenArea.clientHeight;

      // 만약 스크린샷 높이가 목업 화면 높이보다 작거나 같다면 스크롤할 필요가 없습니다.
      if (maxScrollHeight <= 0) {
        return;
      }

      // 2. 휠 이벤트의 델타 값(스크롤 방향 및 양)을 현재 스크롤에 더합니다.
      // event.deltaY는 양수면 아래로 스크롤, 음수면 위로 스크롤입니다.
      currentScroll += event.deltaY * scrollSpeed;

      // 3. 스크롤 위치 제한 (Bounding Checks)
      // 스크롤은 0 (최상단) 보다 작아질 수 없습니다.
      if (currentScroll < 0) {
        currentScroll = 0;
      }

      // 스크롤은 maxScrollHeight (최하단) 보다 커질 수 없습니다.
      if (currentScroll > maxScrollHeight) {
        currentScroll = maxScrollHeight;
      }

      // 4. 스크린샷 이미지에 스크롤 값을 적용합니다.
      // 스크롤 값이 양수이면 이미지를 위쪽(음의 Y축)으로 이동시켜야 스크롤처럼 보입니다.
      screenshot.style.transform = `translateY(-${currentScroll}px)`;
    },
    { passive: false }
  ); // passive: false로 설정하여 preventDefault()가 작동하게 합니다.

  /** intro 타이핑 애니메이션 */
  const typed = new Typed("#typed", {
    strings: [
      `성장하는 웹 퍼블리셔 <br> <span class="intro__highlight">김예원</span>입니다.`,
    ],
    typeSpeed: 80, // 타이핑 속도
    backSpeed: 40, // 지우는 속도
    backDelay: 1500, // 다음 문장 시작 전 대기시간
    startDelay: 500, // 처음 시작 전 대기시간
    loop: false, // 반복 여부
    showCursor: true, // 커서 표시
    cursorChar: "|", // 커서 문자 변경 가능

    onComplete: () => {
      // 타이핑이 끝난 후 highlight 클래스에 show 추가
      const highlight = document.querySelector("#typed .intro__highlight");
      if (highlight) {
        highlight.classList.add("intro__highlight--show");
      }
    },
  });
});
