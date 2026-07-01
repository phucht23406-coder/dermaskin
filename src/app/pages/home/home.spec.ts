import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  // ─── Basic Initialization ──────────────────────────────────────────────────

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render without errors', () => {
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  // ─── Flash Sale Products ───────────────────────────────────────────────────

  it('should have 4 flash sale products', () => {
    expect(component.flashSaleProducts.length).toBe(4);
  });

  it('each flash sale product should have required fields', () => {
    component.flashSaleProducts.forEach((product) => {
      expect(product.id).toBeDefined();
      expect(product.name).toBeTruthy();
      expect(product.price).toBeTruthy();
      expect(product.originalPrice).toBeTruthy();
      expect(product.discount).toBeTruthy();
      expect(product.imageUrl).toBeTruthy();
      expect(product.rating).toBeGreaterThan(0);
      expect(product.sold).toBeGreaterThan(0);
    });
  });

  it('should render 4 flash sale product cards in the DOM', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const flashSaleSection = compiled.querySelector('.flash-sale');
    expect(flashSaleSection).toBeTruthy();
    const cards = flashSaleSection!.querySelectorAll('.product-card');
    expect(cards.length).toBe(4);
  });

  // ─── Brands ───────────────────────────────────────────────────────────────

  it('should have 4 brands', () => {
    expect(component.brands.length).toBe(4);
  });

  it('each brand should have an id, name and imageUrl', () => {
    component.brands.forEach((brand) => {
      expect(brand.id).toBeDefined();
      expect(brand.name).toBeTruthy();
      expect(brand.imageUrl).toBeTruthy();
    });
  });

  it('should render 4 brand cards in the DOM', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const brandsSection = compiled.querySelector('.brands');
    expect(brandsSection).toBeTruthy();
    const cards = brandsSection!.querySelectorAll('.brand-card');
    expect(cards.length).toBe(4);
  });

  // ─── Best Sellers ──────────────────────────────────────────────────────────

  it('should have 4 best seller products', () => {
    expect(component.bestSellers.length).toBe(4);
  });

  it('should render best-sellers section with correct title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const titles = Array.from(compiled.querySelectorAll('.section__title'));
    const banChay = titles.find((el) => el.textContent?.includes('Bán chạy'));
    expect(banChay).toBeTruthy();
  });

  // ─── Clinic Services ──────────────────────────────────────────────────────

  it('should have 4 clinic services', () => {
    expect(component.clinicServices.length).toBe(4);
  });

  it('should render the Clinic & Spa section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const section = compiled.querySelector('.clinic-spa');
    expect(section).toBeTruthy();
  });

  // ─── Suggested Products ───────────────────────────────────────────────────

  it('should have 8 suggested products', () => {
    expect(component.suggestedProducts.length).toBe(8);
  });

  it('should render "Xem thêm" load-more button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const btn = compiled.querySelector('.btn--outline');
    expect(btn).toBeTruthy();
    expect(btn!.textContent?.trim()).toBe('Xem thêm');
  });

  // ─── Countdown Timer ──────────────────────────────────────────────────────

  it('should initialise countdown at 23 hours 08 minutes 35 seconds', () => {
    expect(component.hours).toBe(23);
    expect(component.minutes).toBe(8);
    expect(component.seconds).toBe(35);
  });

  it('paddedHours should zero-pad single-digit hours', () => {
    component.hours = 5;
    expect(component.paddedHours).toBe('05');
  });

  it('paddedMinutes should zero-pad single-digit minutes', () => {
    component.minutes = 3;
    expect(component.paddedMinutes).toBe('03');
  });

  it('paddedSeconds should zero-pad single-digit seconds', () => {
    component.seconds = 9;
    expect(component.paddedSeconds).toBe('09');
  });

  it('should decrement seconds after 1 second', fakeAsync(() => {
    const initialSeconds = component.seconds;
    tick(1000);
    fixture.detectChanges();
    expect(component.seconds).toBe(initialSeconds - 1);
  }));

  it('should roll seconds over and decrement minutes after 60 seconds', fakeAsync(() => {
    component.minutes = 5;
    component.seconds = 0;
    tick(1000);
    fixture.detectChanges();
    expect(component.seconds).toBe(59);
    expect(component.minutes).toBe(4);
  }));

  it('should roll minutes over and decrement hours when minutes and seconds hit 0', fakeAsync(() => {
    component.hours = 2;
    component.minutes = 0;
    component.seconds = 0;
    tick(1000);
    fixture.detectChanges();
    expect(component.seconds).toBe(59);
    expect(component.minutes).toBe(59);
    expect(component.hours).toBe(1);
  }));

  it('should stop the timer when all values reach 0', fakeAsync(() => {
    component.hours = 0;
    component.minutes = 0;
    component.seconds = 1;
    tick(1000);
    fixture.detectChanges();
    expect(component.seconds).toBe(0);
    // Timer stops — no further decrement
    tick(1000);
    fixture.detectChanges();
    expect(component.seconds).toBe(0);
  }));

  // ─── Slide Dots ───────────────────────────────────────────────────────────

  it('should initialise with 3 total slides and current slide 0', () => {
    expect(component.totalSlides).toBe(3);
    expect(component.currentSlide).toBe(0);
  });

  it('setSlide() should update currentSlide', () => {
    component.setSlide(2);
    expect(component.currentSlide).toBe(2);
  });

  it('getSlideRange() should return an array matching totalSlides', () => {
    const range = component.getSlideRange();
    expect(range.length).toBe(component.totalSlides);
    expect(range).toEqual([0, 1, 2]);
  });

  it('should render hero banner with slide dots', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const dots = compiled.querySelectorAll('.hero-banner__dot');
    expect(dots.length).toBe(component.totalSlides);
  });

  // ─── DOM Spot-checks ──────────────────────────────────────────────────────

  it('should render the Flash Sale! heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('.section__title');
    expect(heading).toBeTruthy();
    // The first section title should be "Flash Sale!"
    expect(heading!.textContent?.trim()).toBe('Flash Sale!');
  });

  it('should render the countdown timer blocks', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const blocks = compiled.querySelectorAll('.countdown__block');
    expect(blocks.length).toBe(3); // hours : minutes : seconds
  });

  it('should render the hero banner image', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const img = compiled.querySelector('.hero-banner__image') as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.src).toContain('builder.io');
  });

  it('should render "Gợi ý cho bạn" section heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const titles = Array.from(compiled.querySelectorAll('.section__title'));
    const goiY = titles.find((el) => el.textContent?.includes('Gợi ý cho bạn'));
    expect(goiY).toBeTruthy();
  });
});
