// blog.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Blog } from './blog';

describe('Blog', () => {
  let component: Blog;
  let fixture: ComponentFixture<Blog>;
  let debugEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Blog],
    }).compileComponents();

    fixture = TestBed.createComponent(Blog);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    fixture.detectChanges();
  });

  // ==========================================================
  // Component initialization
  // ==========================================================

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with isDetailView set to false (overview shown by default)', () => {
    expect(component.isDetailView).toBeFalsy();
  });

  it('should populate the articles array with mock data', () => {
    expect(component.articles).toBeTruthy();
    expect(component.articles.length).toBeGreaterThan(0);
  });

  it('should include the target article "Đắp Mặt Nạ..." with the correct slug', () => {
    const targetArticle = component.articles.find(
      (article) => article.slug === 'dap-mat-na-bao-lau'
    );
    expect(targetArticle).toBeTruthy();
    expect(targetArticle?.title).toContain('Đắp Mặt Nạ Bao Lâu Là Đủ?');
    expect(targetArticle?.featured).toBeTruthy();
  });

  it('should populate relatedProducts with 6 mock products', () => {
    expect(component.relatedProducts.length).toBe(6);
  });

  it('should populate popularArticles excluding the currently featured article', () => {
    const containsTarget = component.popularArticles.some(
      (article) => article.slug === 'dap-mat-na-bao-lau'
    );
    expect(containsTarget).toBeFalsy();
  });

  // ==========================================================
  // Rendering: Overview vs Detail view
  // ==========================================================

  it('should render the Blog Overview view when isDetailView is false', () => {
    const overviewEl = debugEl.query(By.css('.blog-overview'));
    const detailEl = debugEl.query(By.css('.blog-detail'));

    expect(overviewEl).toBeTruthy();
    expect(detailEl).toBeFalsy();
  });

  it('should render an .article-card for every article in the list', () => {
    const cards = debugEl.queryAll(By.css('.article-card'));
    expect(cards.length).toBe(component.articles.length);
  });

  it('should render the Blog Detail view when isDetailView is true', () => {
    component.isDetailView = true;
    fixture.detectChanges();

    const overviewEl = debugEl.query(By.css('.blog-overview'));
    const detailEl = debugEl.query(By.css('.blog-detail'));

    expect(detailEl).toBeTruthy();
    expect(overviewEl).toBeFalsy();
  });

  it('should display the full article title in the detail view', () => {
    component.isDetailView = true;
    fixture.detectChanges();

    const titleEl = debugEl.query(By.css('.blog-detail__main-title'));
    expect(titleEl.nativeElement.textContent).toContain('Đắp Mặt Nạ Bao Lâu Là Đủ?');
    expect(titleEl.nativeElement.textContent).toContain('Thời Gian Lý Tưởng Cho Từng Loại');
  });

  // ==========================================================
  // Toggle behavior: openArticleDetail() / backToBlog()
  // ==========================================================

  it('should set isDetailView to true when openArticleDetail() is called', () => {
    expect(component.isDetailView).toBeFalsy();

    component.openArticleDetail();

    expect(component.isDetailView).toBeTruthy();
  });

  it('should set isDetailView to false when backToBlog() is called', () => {
    component.isDetailView = true;
    fixture.detectChanges();

    component.backToBlog();

    expect(component.isDetailView).toBeFalsy();
  });

  it('should switch from overview to detail view when the featured article card is clicked', () => {
    const featuredCard = debugEl
      .queryAll(By.css('.article-card'))
      .find((card) =>
        card.nativeElement.textContent.includes('Đắp Mặt Nạ Bao Lâu Là Đủ?')
      );

    expect(featuredCard).toBeTruthy();

    featuredCard!.nativeElement.click();
    fixture.detectChanges();

    expect(component.isDetailView).toBeTruthy();
    expect(debugEl.query(By.css('.blog-detail'))).toBeTruthy();
  });

  it('should NOT switch view when a non-target article card is clicked', () => {
    const otherCard = debugEl
      .queryAll(By.css('.article-card'))
      .find(
        (card) =>
          !card.nativeElement.textContent.includes('Đắp Mặt Nạ Bao Lâu Là Đủ?')
      );

    expect(otherCard).toBeTruthy();

    otherCard!.nativeElement.click();
    fixture.detectChanges();

    expect(component.isDetailView).toBeFalsy();
  });

  it('should switch back to overview view when the "Back to Blog" button is clicked', () => {
    component.isDetailView = true;
    fixture.detectChanges();

    const backBtn = debugEl.query(By.css('.back-btn'));
    expect(backBtn).toBeTruthy();

    backBtn.nativeElement.click();
    fixture.detectChanges();

    expect(component.isDetailView).toBeFalsy();
    expect(debugEl.query(By.css('.blog-overview'))).toBeTruthy();
  });

  it('should render a .product-card for every item in relatedProducts within the detail view', () => {
    component.isDetailView = true;
    fixture.detectChanges();

    const productCards = debugEl.queryAll(By.css('.product-card'));
    expect(productCards.length).toBe(component.relatedProducts.length);
  });

  it('should render the 4 static "Bài viết xem nhiều" cards in the detail-view sidebar', () => {
    // NOTE: blog.html currently hardcodes these 4 cards directly (no *ngFor binding
    // to `popularArticles`). This test matches the template as-is. If you switch the
    // markup to `*ngFor="let article of popularArticles"`, update this assertion to
    // `component.popularArticles.length` instead of the literal 4.
    component.isDetailView = true;
    fixture.detectChanges();

    const sidebarArticles = debugEl.queryAll(By.css('.sidebar-article'));
    expect(sidebarArticles.length).toBe(4);
  });
});
