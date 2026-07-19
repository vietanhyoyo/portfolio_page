# Kế hoạch tái xây dựng UI Portfolio

## 1. Mục tiêu

Tái xây dựng toàn bộ phần giao diện của portfolio theo hướng hiện đại, có chiều sâu và chuyển động mượt hơn, nhưng giữ nguyên nội dung, dữ liệu, chức năng và phong cách màu đang có.

Kết quả cần đạt:

- Giữ nguyên toàn bộ nội dung đa ngôn ngữ trong `messages/en.json` và `messages/vi.json`; hai file này tiếp tục là nguồn nội dung chính và không được chỉnh sửa.
- Giữ nguyên primary color hiện tại: `hsl(211 100% 57%)` ở cả light mode và dark mode.
- Giữ phong cách sáng/tối hiện tại: nền trắng/slate ở light mode, slate đậm ở dark mode, điểm nhấn xanh primary và hiệu ứng glow xanh vừa phải.
- Loại bỏ hoàn toàn component `<Reveal>` và không tạo lại mô hình “một wrapper + một observer cho từng mẩu nội dung”.
- Dùng Anime.js cho entrance animation, stagger, 3D interaction và animation đồng bộ với scroll.
- Nâng nền tảng từ Next.js 14.1 lên bản stable mới nhất đã xác minh khi cập nhật kế hoạch: Next.js `16.2.10`, đi cùng bộ React 19 tương thích.
- Giữ nguyên các chức năng đang có: đổi ngôn ngữ, đổi theme, audio player, tải CV, liên kết liên hệ, danh sách skill, experience, project carousel và form EmailJS.
- Tạo một quả địa cầu wireframe bằng các cạnh đa giác tại vùng nền giao nhau giữa Hero và Skills; quả cầu xoay 3D theo tiến độ cuộn từ Hero tới Skills.
- Tương thích tốt với desktop, tablet, mobile, keyboard navigation và `prefers-reduced-motion`.

## 2. Phạm vi bất biến

Các phần sau không được thay đổi về nội dung hoặc nghiệp vụ trong quá trình làm lại UI:

- Không sửa, xóa, đổi tên key hoặc dịch lại nội dung trong thư mục `messages/`.
- Không thay đổi tên, mô tả, số sao, biểu tượng và màu nhận diện của 9 skill hiện có.
- Không thay đổi dữ liệu của 10 mốc experience: tên dự án, khách hàng, quốc gia, thời gian, công nghệ, vai trò và trách nhiệm.
- Không thay đổi nội dung project, URL, email, số điện thoại, Behance, CV và danh sách audio.
- Không thay đổi logic gửi form EmailJS hoặc logic phát audio, trừ khi cần chỉnh markup/ref để phù hợp với layout mới.
- Tiếp tục dùng `/images/character5.png` làm hình chính ở hero.

Có thể thay đổi cấu trúc component, bố cục, class Tailwind, CSS trang trí và cách animation được tổ chức, miễn các nội dung và hành vi trên vẫn được giữ nguyên.

## 3. Hiện trạng đã khảo sát

- Stack hiện tại: Next.js 14.1, React 18, TypeScript, Tailwind CSS 3, `next-intl`, `next-themes`.
- Bản stable mới nhất được xác minh ngày 18/07/2026 là Next.js `16.2.10`; bộ package hiện hành tương ứng là React/React DOM `19.2.7`. Next.js 16 yêu cầu Node.js tối thiểu `20.9.0`.
- Dự án có các điểm cần migration khi lên Next.js 16: route `params` đang được đọc đồng bộ, `src/middleware.ts` dùng convention cũ, script `next lint` đã bị loại bỏ ở Next.js 16 và cấu hình ESLint hiện vẫn là `.eslintrc.json`.
- `next-intl` đang khai báo `^3.8.0` trong `package.json` và cài thực tế bản 3.x; cần nâng lên nhánh 4.x tương thích Next.js 16 mà không sửa nội dung trong `messages/`.
- Anime.js chưa được cài. API triển khai được thiết kế theo Anime.js v4; phiên bản stable được kiểm tra khi lập kế hoạch là `4.5.0`.
- `<Reveal>` hiện dựa trên Framer Motion và được dùng tại Hero, Skills, Experience, Projects và Contact. Nhiều instance riêng lẻ tạo thêm wrapper, observer và animation controller.
- `framer-motion` chỉ đang được dùng bởi `src/components/animation/Reveal.tsx`; có thể gỡ dependency sau khi xóa toàn bộ import `Reveal`.
- Hero hiện đã dùng `/images/character5.png`, ảnh gốc có kích thước 1414 × 2000 px.
- Experience hiện có một đường viền rời ở từng item và 7 khối aurora blur chạy CSS; chưa có một timeline liên tục hoặc điểm sáng bám theo scroll.
- Skills hiện là horizontal scroller với card lật 180 độ. Nội dung đẹp nhưng tương tác hover không phù hợp với màn hình cảm ứng và card có nhiều transform/transition chồng nhau.
- Lint baseline đang chạy thành công nhưng có 3 warning có sẵn: 1 warning về Google font và 2 warning dependency trong `AudioPlayer`. Không coi các warning có sẵn này là lỗi phát sinh từ việc redesign.

## 4. Định hướng thiết kế

### 4.1. Visual system

- Giữ `--primary: 211 100% 57%` không đổi.
- Chuẩn hóa thêm các token bề mặt, border, shadow và glow dựa trên màu hiện có, ví dụ: `--surface`, `--surface-elevated`, `--surface-border`, `--primary-glow`, nhưng không tạo một palette hoàn toàn khác.
- Light mode: nền trắng/slate rất nhạt, card trắng trong nhẹ, chữ slate 700–950, shadow xanh xám dịu.
- Dark mode: nền slate 800–950, card slate trong nhẹ, border trắng mờ, chữ slate 50–300, glow primary có kiểm soát.
- Dùng bo góc lớn, glass surface, đường viền mảnh, lớp highlight và shadow nhiều tầng để tạo chiều sâu.
- Giữ typography hiện tại (Roboto cho tiếng Việt, Rubik cho tiếng Anh), đồng thời thống nhất thang heading/body/caption và khoảng cách section.
- Chỉ animation `transform` và `opacity` ở các chuyển động liên tục; hạn chế blur/filter lớn chạy mỗi frame.

### 4.2. Ngôn ngữ chuyển động

- Entrance: fade + translate ngắn, stagger theo nhóm, duration khoảng 450–750 ms.
- Hover/focus: scale/tilt nhỏ và spring-like ease; không dùng chuyển động quá mạnh khiến nội dung khó đọc.
- Ambient motion: biên độ nhỏ, tốc độ chậm, chỉ dùng ở hero card hoặc chi tiết trang trí quan trọng.
- Scroll-linked motion: chỉ áp dụng nơi nó truyền tải tiến trình, đặc biệt là globe Hero–Skills và Experience timeline.
- Mobile/touch: bỏ phụ thuộc vào hover; card luôn đọc được nội dung.
- Reduced motion: bỏ loop, tilt, parallax và scroll-scrub; nội dung hiển thị ngay hoặc chỉ fade rất ngắn.

## 5. Kiến trúc kỹ thuật

### 5.1. Nâng cấp Next.js 16

- Chốt target triển khai là stable release `next@16.2.10`, không dùng `preview`, `canary` hoặc `rc`.
- Nâng đồng bộ `react` và `react-dom` lên `19.2.7`, `@types/react`/`@types/react-dom` lên bản 19 tương thích, và `eslint-config-next` lên đúng major/version với Next.js.
- Nâng `next-intl` lên nhánh 4.x có peer dependency hỗ trợ Next.js 16; rà lại request config/proxy nhưng giữ nguyên tuyệt đối `messages/en.json` và `messages/vi.json`.
- Khai báo hoặc ghi rõ Node.js `>=20.9.0`; ưu tiên một bản Node LTS thống nhất cho local, CI và môi trường deploy.
- Chuyển toàn bộ `params`/`searchParams` thuộc App Router sang async API của Next.js 16 và cập nhật type tương ứng.
- Đổi convention `src/middleware.ts` sang `src/proxy.ts` theo Next.js 16, đồng thời giữ nguyên locale matcher và redirect behavior của `next-intl`.
- Thay script `next lint` bằng ESLint CLI, chuyển từ `.eslintrc.json` sang flat config `eslint.config.mjs`, vì Next.js 16 đã bỏ lệnh `next lint`.
- Kiểm tra cả `next dev` và `next build` bằng Turbopack mặc định. Chỉ fallback `--webpack` nếu phát hiện incompatibility có bằng chứng và ghi lại nguyên nhân.
- Chạy codemod chính thức trên một commit riêng, sau đó review diff thủ công; không chấp nhận codemod sửa nội dung, theme hoặc file `messages`.

### 5.2. Cài đặt Anime.js và client boundary

- Cài `animejs` và cập nhật cả `package.json` lẫn `package-lock.json`.
- Dùng API Anime.js v4: `animate`, `createTimeline`, `stagger`, `createScope` và `onScroll` khi cần.
- Chỉ gọi Anime.js trong Client Component và trong `useEffect`; không truy cập DOM khi server render.
- Ưu tiên giữ component lấy translation ở server. Mỗi section chỉ tách một Client Component tương tác lớn và truyền dữ liệu đã dịch xuống qua props, thay vì biến toàn bộ trang thành client-rendered.

### 5.3. Scope và cleanup

- Tạo hook/helper dùng chung, dự kiến `src/hook/useAnimeScope.ts`, bao quanh `createScope({ root, mediaQueries })`.
- Mỗi section có một root ref và tối đa một Anime.js scope chính. Các phần tử con được chọn bằng ref hoặc `data-animate`, rồi chạy stagger trong cùng timeline.
- Cleanup bắt buộc bằng `scope.revert()` khi unmount hoặc khi effect chạy lại, để tương thích React Strict Mode và tránh animation/listener tồn tại sau khi chuyển route.
- Không tạo một component thay thế có cách dùng giống `<Reveal>` cho từng node nhỏ. Animation entrance được khai báo theo section để giảm wrapper và observer.
- Dùng media query `prefers-reduced-motion: reduce` trong scope để đặt duration về 0, tắt loop và tắt pointer tilt.
- Chỉ thêm `will-change` ngay trước animation hoặc cho phần tử thực sự chạy liên tục; không gắn diện rộng cho toàn bộ card/list.

## 6. Kế hoạch triển khai theo giai đoạn

### Giai đoạn 0 — Nâng cấp Next.js trước khi redesign

1. Ghi nhận baseline bằng `npm run lint`, `npm run build`, ảnh chụp hai locale/theme và checksum của `messages/` trước khi nâng cấp.
2. Tạo commit migration độc lập; chạy Next.js codemod upgrade rồi nâng bộ package đã chốt: Next.js 16.2.10, React/React DOM 19.2.7, React types, `eslint-config-next` và `next-intl` 4.x tương thích.
3. Cập nhật các App Router route/layout đang destructure `params` đồng bộ sang `params: Promise<...>` và `await params`, gồm tối thiểu:
   - `src/app/[locale]/layout.tsx`;
   - `src/app/[locale]/page.tsx`;
   - `src/app/[locale]/portfolio/layout.tsx`;
   - `src/app/[locale]/portfolio/page.tsx`.
4. Đổi `src/middleware.ts` thành `src/proxy.ts`, cập nhật setup `next-intl` 4.x và kiểm tra redirect `/`, `/en`, `/vi`, locale switcher cùng catch-all 404.
5. Rà cấu trúc root/locale layout để bảo đảm Next.js 16 chỉ render một cặp `<html>/<body>` hợp lệ và `lang` vẫn phản ánh đúng locale.
6. Chuyển ESLint sang flat config và sửa script `lint` thành `eslint .`; giữ nguyên rule `next/core-web-vitals` tương đương.
7. Chạy `npm install`, `npm run lint`, `npm run build` và smoke test với Turbopack trước khi bắt đầu thay UI. Nếu migration chưa xanh thì chưa trộn thay đổi redesign vào cùng commit.
8. Kiểm tra compatibility React 19 cho AudioPlayer, EmailJS, form, typing animation, theme, carousel và SVG/image imports; chỉ nâng hoặc thay package phụ khi có lỗi/peer warning thực tế.

### Giai đoạn 1 — Nền tảng giao diện và animation

1. Cài Anime.js, tạo helper scope và định nghĩa motion constants dùng chung.
2. Chuẩn hóa surface/token cho light/dark trong `src/app/styles.css` và phần CSS trang trí trong `src/app/[locale]/globals.css`.
3. Tạo primitive UI tối thiểu nếu cần: section heading, glass surface và accent line; không đưa nội dung vào primitive.
4. Tạo entrance timeline theo section bằng `data-animate` + `stagger`, mặc định chỉ chạy một lần khi section đi vào viewport.
5. Bổ sung reduced-motion và đảm bảo trạng thái trước animation không làm nội dung bị ẩn nếu JavaScript lỗi hoặc chưa hydrate.

### Giai đoạn 2 — Header, điều hướng và setting controls

1. Làm lại header dạng floating glass capsule nhất quán với card system mới.
2. Giữ nguyên các anchor Home, Skill, Experience, Projects, Contact và hành vi smooth scroll.
3. Thêm active-section indicator chạy nhẹ bằng Anime.js dựa trên section hiện tại; indicator chỉ dùng `translate`/`scale`, không làm reflow danh sách link.
4. Làm lại mobile drawer và cụm setting theo cùng surface/border/glow; giữ nguyên language, theme và audio actions.
5. Bảo đảm focus ring, `aria-expanded`, vùng bấm tối thiểu 44 px và header không che heading khi scroll tới anchor.

### Giai đoạn 3 — Hero và card 3D cho `character5.png`

1. Tổ chức hero thành hai vùng rõ ràng: nội dung giới thiệu/CTA và visual card; giữ nguyên toàn bộ text, TypingText, link, icon và AudioPlayer.
2. Đưa `/images/character5.png` vào một card dọc có các lớp:
   - outer perspective wrapper;
   - lớp float chỉ phụ trách translate/ambient rotation;
   - lớp tilt card phụ trách `rotateX`, `rotateY` và scale theo pointer;
   - image layer có `translateZ` nhẹ;
   - border highlight, primary glow, shadow và nền grid/gradient nằm ở các lớp riêng.
3. Tách float và pointer tilt thành hai DOM layer để hai animation không ghi đè cùng thuộc tính `transform`.
4. Dùng Anime.js cho:
   - entrance timeline của greeting, typing text, resume, action icons và portrait card;
   - loop trôi nổi rất nhẹ của outer card;
   - nội suy tilt theo vị trí pointer và animate trở về trạng thái cân bằng khi pointer rời card;
   - stagger nhẹ cho action icons.
5. Giới hạn góc nghiêng khoảng 6–9 độ, translate tối đa nhỏ và không để card vượt viewport.
6. Trên touch/reduced-motion: tắt pointer tilt, giữ card tĩnh hoặc chỉ có entrance fade; không chặn thao tác scroll.
7. Bố trí AudioPlayer thành một music dock bằng glass surface nằm ngay dưới portrait card ở desktop, thẳng hàng với visual column nhưng tách khỏi lớp 3D tilt/float; controls vì vậy không bị nghiêng, rung hoặc đổi vùng click khi tương tác với card.
8. Trên mobile, music dock nằm sau portrait card và trước vùng chuyển tiếp sang Skills, rộng theo content container, không fixed/sticky và không che setting controls.
9. Giữ nguyên toàn bộ track, waveform/visualizer, play/pause, next/previous, seek, volume và kết nối với `AudioToggle`; chỉ chỉnh responsive layout, spacing và surface của player.

### Giai đoạn 4 — Globe wireframe tại vùng chuyển tiếp Hero–Skills

1. Tạo component Client mới, dự kiến `HeroSkillsGlobe.tsx`, đặt trong một transition layer giao nhau giữa cuối Hero và đầu Skills.
2. Dựng quả cầu theo dạng geodesic wireframe:
   - sinh các vertex trên mặt cầu và danh sách cạnh tam giác/đa giác một lần;
   - xoay vertex trong không gian 3D theo trục X/Y;
   - chiếu perspective xuống Canvas 2D;
   - vẽ cạnh mặt trước rõ hơn và cạnh phía sau mờ hơn để tạo chiều sâu.
3. Không thêm Three.js hoặc WebGL chỉ cho hiệu ứng này. Dùng Canvas 2D để tránh hàng trăm DOM/SVG node và giữ bundle/paint cost thấp.
4. Dùng Anime.js `onScroll({ sync: true })` để ánh xạ tiến độ cuộn của vùng Hero–Skills sang state góc quay; trong mỗi update chỉ project và redraw các line cần thiết.
5. Quả cầu bắt đầu hiện dần ở phần cuối Hero, xoay khoảng 220–320 độ quanh trục Y và nghiêng nhẹ quanh trục X, sau đó mờ dần khi heading/cards Skills trở thành nội dung chính.
6. Đặt globe ở background layer, `pointer-events: none`, `aria-hidden="true"`, dùng mask/gradient ở mép trên dưới; không che text, AudioPlayer hoặc skill cards.
7. Màu line bám theo theme: primary/cyan-slate ở light mode và primary/blue-white mờ ở dark mode; primary color gốc không đổi.
8. Responsive theo breakpoint:
   - desktop: đường kính khoảng 520–680 px, line density đầy đủ;
   - tablet: khoảng 400–500 px;
   - mobile: khoảng 280–360 px, giảm subdivision/số cạnh và giới hạn device pixel ratio để giảm tải.
9. Canvas resize theo container bằng `ResizeObserver`, cache topology, clamp DPR tối đa 2 và chỉ redraw khi scroll/resize/theme thay đổi; không chạy requestAnimationFrame vô hạn khi trang đứng yên.
10. Với `prefers-reduced-motion`, render globe ở một góc tĩnh và chỉ dùng opacity transition ngắn; không scrub hoặc tự xoay.

### Giai đoạn 5 — Skills thành bộ card mới

1. Chuyển dữ liệu skill hiện có sang cấu hình render chung nhưng vẫn lấy phần mô tả từ namespace `Skill` trong `messages`.
2. Thay card lật 180 độ bằng card luôn đọc được nội dung:
   - icon trong badge có vòng accent;
   - tên skill, mô tả và rating nằm trên cùng một mặt;
   - màu riêng của từng skill chỉ dùng làm accent/glow, primary vẫn là màu điều hướng chính;
   - lớp gradient/noise/highlight tạo cảm giác cao cấp mà không làm giảm độ tương phản.
3. Desktop dùng responsive grid/bento 3 cột; tablet 2 cột; mobile 1 cột hoặc horizontal snap nếu chiều cao trang trở nên quá dài. Nội dung không phụ thuộc hover để xuất hiện.
4. Dùng Anime.js để stagger card khi grid đi vào viewport, icon settle/rotate nhẹ và tilt rất nhỏ khi hover/focus trên thiết bị phù hợp.
5. Dùng event delegation hoặc một scope chung cho grid, không tạo effect riêng cho từng card.
6. Giữ keyboard focus, text selection và thao tác cuộn ngang trên mobile; không dùng drag handler tự viết nếu CSS scroll-snap đã đáp ứng đủ.

### Giai đoạn 6 — Experience timeline có điểm sáng chạy theo scroll

1. Giữ nguyên mảng `experienceConfigs` và toàn bộ key dịch; chỉ chuyển phần hiển thị sang một `ExperienceTimeline` Client Component nhận dữ liệu đã dịch.
2. Tạo một timeline liên tục gồm:
   - track nền chạy từ mốc đầu đến mốc cuối;
   - progress line màu primary có `transform-origin: top`;
   - glowing cursor/dot nằm trên track;
   - node riêng tại đúng vị trí của từng mốc thời gian;
   - card nội dung nằm cạnh node.
3. Đồng bộ `scaleY` của progress line và `translateY` của glowing cursor với tiến độ cuộn bằng Anime.js `onScroll({ sync: true })`.
4. Tính quãng đường từ tâm node đầu đến tâm node cuối theo kích thước DOM thực tế; không hard-code chiều cao vì nội dung tiếng Việt và tiếng Anh khác nhau.
5. Khi cursor đi qua một mốc:
   - node chuyển sang primary, sáng mạnh hơn và có pulse ngắn;
   - time label và card tương ứng chuyển sang active state;
   - item entrance chạy một lần, không chạy lại liên tục khi cuộn qua lại.
6. Dùng `ResizeObserver` hoặc cơ chế refresh của scope để đo lại track khi viewport, font hoặc locale thay đổi.
7. Desktop đặt line ở một trục rõ ràng và card có khoảng thở; mobile chuyển line về bên trái, card ở bên phải để tránh zig-zag khó đọc.
8. Thay 7 aurora blur đang chạy liên tục bằng nền radial gradient tĩnh hoặc tối đa 1–2 lớp transform chậm. Điều này giảm paint cost nhưng vẫn giữ không khí màu xanh/tím hiện tại.
9. Reduced-motion fallback: progress line và node active cập nhật không có scrub animation; mọi card hiển thị ngay.

### Giai đoạn 7 — Projects

1. Giữ nguyên danh sách project, hình ảnh, mô tả, technical tags và link.
2. Làm lại vùng project thành showcase có card nổi, surface và khoảng cách đồng nhất với Skills/Experience.
3. Giữ chức năng previous/next, dot navigation, drag/swipe và trạng thái active; không để card nền nhận click nhầm.
4. Dùng Anime.js timeline cho chuyển card: active card vào giữa, card cũ lùi về lớp sau, opacity/scale/rotate được animate cùng lúc.
5. Không tạo animation loop cho project carousel. Chỉ chạy khi người dùng điều hướng hoặc khi section entrance.
6. Bảo đảm chiều cao ổn định giữa các project để tránh layout shift và giữ nội dung link/tag có thể focus bằng keyboard.

### Giai đoạn 8 — Contact và footer

1. Làm lại contact thành panel/card thống nhất với visual system, giữ nguyên title, form strings, EmailJS và các contact icon.
2. Dùng Anime.js cho entrance của title, panel và icon; dùng một timeline ngắn để mở/đóng nội dung form thay cho các transition chồng nhau nếu kết quả đo đạc cho thấy mượt hơn.
3. Đánh giá lại Spline iframe đang dùng làm background:
   - mặc định ưu tiên nền gradient/glow nhẹ nội bộ để giảm tải mạng/GPU;
   - nếu vẫn giữ Spline, tiếp tục lazy-load và tắt/không tải trong reduced-motion hoặc thiết bị yếu.
4. Giữ thông báo gửi thành công, loading state, validation và footer copyright.

### Giai đoạn 9 — Xóa `Reveal` và cleanup

1. Xóa toàn bộ import/usage của `Reveal` khỏi Start, Skills, Experience, Projects, Contact và ContactForm.
2. Xóa `src/components/animation/Reveal.tsx` sau khi `rg "Reveal" src` không còn kết quả.
3. Gỡ `framer-motion` khỏi `package.json`/`package-lock.json` vì hiện không còn consumer nào khác.
4. Không gỡ `react-spring` hoặc dependency khác trong cùng thay đổi nếu chưa audit riêng; tránh mở rộng phạm vi ngoài redesign.
5. Xóa CSS animation/class cũ không còn dùng sau khi đã kiểm tra bằng search, nhưng giữ các utility hoặc animation đang phục vụ AudioPlayer và control khác.

## 7. Danh sách file dự kiến tác động

File chắc chắn hoặc gần như chắc chắn cần sửa:

- `package.json`
- `package-lock.json`
- `.eslintrc.json` (được thay bằng flat config)
- `src/app/layout.tsx`
- `src/app/[locale]/layout.tsx`
- `src/app/[locale]/page.tsx`
- `src/app/[locale]/portfolio/layout.tsx`
- `src/app/[locale]/portfolio/page.tsx`
- `src/i18n.ts` hoặc cấu trúc request config mới tương ứng của `next-intl` 4.x
- `src/middleware.ts` (đổi convention sang `src/proxy.ts`)
- `next.config.mjs`
- `tsconfig.json`
- `src/app/styles.css`
- `src/app/[locale]/globals.css`
- `src/components/layouts/header/index.tsx`
- `src/components/layouts/Drawer.tsx`
- `src/components/start/index.tsx`
- `src/components/start/GridBackground.tsx`
- `src/components/skills/index.tsx`
- `src/components/skills/SkillCard.tsx`
- `src/components/skills/SkillsScroll.tsx` hoặc component grid thay thế
- `src/components/experience/index.tsx`
- `src/components/experience/CompanyInfo.tsx`
- `src/components/experience/ProjectItem.tsx`
- `src/components/projects/index.tsx`
- `src/components/projects/ProjectsCarousel.tsx`
- `src/components/projects/AnimateCarousel.tsx`
- `src/components/contact/index.tsx`
- `src/components/contact/ContactForm.tsx`
- `src/components/contact/ContactBackgournd.tsx`

File/component dự kiến tạo mới:

- `eslint.config.mjs`
- `src/proxy.ts`
- `src/hook/useAnimeScope.ts`
- `src/components/start/HeroPortraitCard.tsx`
- `src/components/start/HeroSkillsGlobe.tsx`
- `src/components/skills/SkillsGrid.tsx` nếu thay scroller hiện tại
- `src/components/experience/ExperienceTimeline.tsx`
- Có thể thêm primitive dùng chung trong `src/components/ui/` nếu ít nhất hai section thực sự dùng chung.

File dự kiến xóa:

- `.eslintrc.json` sau khi flat config hoạt động
- `src/middleware.ts` sau khi `src/proxy.ts` giữ nguyên đúng routing behavior
- `src/components/animation/Reveal.tsx`

File tuyệt đối không sửa:

- `messages/en.json`
- `messages/vi.json`

## 8. Thứ tự thực hiện đề xuất

Thực hiện theo các pull request/commit nhỏ để dễ kiểm tra và rollback:

1. `chore(next): upgrade to next 16 and react 19`
2. `refactor(i18n): migrate async params proxy and next-intl`
3. `chore(lint): migrate next lint to eslint flat config`
4. `chore(animation): add animejs and scoped animation helper`
5. `style(system): rebuild theme surfaces and section primitives`
6. `feat(hero): rebuild hero with portrait card and audio dock`
7. `feat(transition): add scroll-driven wireframe globe`
8. `feat(skills): replace flip scroller with responsive skill cards`
9. `feat(experience): add scroll-synced glowing timeline`
10. `feat(projects): rebuild animated project showcase`
11. `feat(contact): restyle contact panel and footer`
12. `refactor(animation): remove Reveal and framer-motion`
13. `test(ui): responsive accessibility and performance pass`

Sau mỗi giai đoạn phải chạy lint/build và xem cả hai locale/theme; không chờ đến cuối mới phát hiện lỗi layout hoặc hydration.

## 9. Kiểm thử và xác minh

### 9.1. Tự động

- `npm run lint`
- `npm run build`
- `npm ls next react react-dom next-intl` phải trả về cây dependency hợp lệ, không có peer dependency lỗi; version target là Next.js 16.2.10 và React/React DOM 19.2.7.
- Kiểm tra Node runtime đáp ứng `>=20.9.0` ở local và môi trường deploy.
- `rg "middleware|params: \{ locale" src` được review để xác nhận không còn convention hoặc synchronous route params cũ ngoài các trường hợp không thuộc App Router API.
- `rg "Reveal|framer-motion" src package.json` phải không còn kết quả sau cleanup.
- So sánh checksum hoặc `git diff -- messages/` để xác nhận thư mục `messages` không đổi.
- Kiểm tra console không có hydration warning, effect chạy lặp, observer bị leak hoặc lỗi Anime.js target `null`.

### 9.2. Visual matrix

Kiểm tra tối thiểu các viewport:

- Mobile: 375 × 812 và 390 × 844.
- Tablet: 768 × 1024.
- Laptop: 1366 × 768.
- Desktop: 1440 × 900 và màn hình rộng từ 1536 px.

Mỗi viewport phải kiểm tra đủ:

- Locale `/vi/portfolio` và `/en/portfolio`.
- Light mode và dark mode.
- Header/drawer, hero, music dock, globe chuyển tiếp, skill cards, experience timeline, project navigation, contact form và setting controls.
- Reload giữa section, chuyển tab rồi quay lại, resize cửa sổ và đổi locale/theme.

### 9.3. Accessibility

- Tab order hợp lý; mọi button/link có focus-visible rõ ràng.
- Card tilt không làm nội dung/CTA di chuyển khỏi vùng click.
- Không có nội dung chỉ xuất hiện khi hover.
- Màu chữ, border và primary glow đủ tương phản ở cả hai theme.
- Với `prefers-reduced-motion: reduce`, không có loop float, tilt, parallax hoặc scroll scrub.
- Decorative layers dùng `aria-hidden="true"` và không chặn pointer event.
- Music dock giữ nguyên tab order, label và vùng bấm; globe hoàn toàn decorative và không xuất hiện trong accessibility tree.

### 9.4. Hiệu năng

- Không dùng animation liên tục cho `width`, `height`, `top`, `left`, box-shadow blur lớn hoặc filter blur lớn; ưu tiên `transform`/`opacity`.
- Không tạo scroll listener riêng cho từng experience/skill card.
- Rà Performance panel khi cuộn qua globe, Experience và khi rê chuột trên hero card; mục tiêu không có long task do animation và duy trì cảm giác 60 fps trên thiết bị phổ thông.
- Globe không có animation loop nền: topology được cache, DPR được clamp và Canvas chỉ redraw khi scroll/resize/theme thực sự thay đổi.
- Kiểm tra Layout Shift: ảnh có width/height hoặc aspect ratio cố định, carousel/timeline không nhảy khi font và image tải xong.
- Anime.js scope và ScrollObserver phải được revert/disconnect sau unmount.

## 10. Tiêu chí nghiệm thu

Redesign được coi là hoàn tất khi thỏa tất cả điều kiện sau:

- UI của Header, Hero, Skills, Experience, Projects và Contact đã cùng một visual system mới.
- Dự án chạy trên Next.js 16.2.10 và React/React DOM 19.2.7, dùng Node.js `>=20.9.0`, async route params, `proxy.ts`, ESLint CLI và Turbopack build thành công.
- Nội dung và chức năng hiện tại vẫn đầy đủ ở cả tiếng Việt và tiếng Anh.
- `messages/en.json` và `messages/vi.json` không có diff.
- Primary color vẫn là `hsl(211 100% 57%)` ở cả light/dark mode.
- `/images/character5.png` nằm trong card 3D, có tilt theo pointer và cảm giác trôi nổi; mobile/reduced-motion có fallback an toàn.
- AudioPlayer vẫn đầy đủ chức năng và được bố trí thành dock ổn định dưới portrait card, không chịu transform của card 3D và không che nội dung trên mobile.
- Vùng giao nhau Hero–Skills có globe wireframe cấu thành từ các cạnh đa giác, xoay 3D theo scroll, đổi màu đúng theme và có static fallback cho reduced-motion.
- Skills hiển thị thành các card đẹp, dễ đọc, responsive và không phụ thuộc hover.
- Experience có một line liên tục, progress line và điểm sáng di chuyển theo scroll; từng mốc active đúng khi điểm sáng đi qua.
- Không còn `<Reveal>`, file `Reveal.tsx` hoặc dependency `framer-motion`.
- Anime.js effect có cleanup, không có hydration error hoặc listener/observer leak.
- `npm run lint` và `npm run build` thành công; không phát sinh warning mới so với baseline.
- Trải nghiệm cuộn và tương tác mượt ở các viewport đã nêu, bao gồm reduced-motion.

## 11. Tài liệu kỹ thuật tham chiếu

- Next.js 16 upgrade guide: https://nextjs.org/docs/app/guides/upgrading/version-16
- Next.js 16.2 release: https://nextjs.org/blog/next-16-2
- Next.js upgrade/codemod guides: https://nextjs.org/docs/app/guides/upgrading
- React integration và cleanup bằng `createScope`: https://animejs.com/documentation/getting-started/using-with-react/
- Scope, root và media queries: https://animejs.com/documentation/scope/
- Scroll-linked animation với `onScroll`: https://animejs.com/documentation/events/onscroll/
- Timeline: https://animejs.com/documentation/timeline/
- Stagger: https://animejs.com/documentation/utilities/stagger/
