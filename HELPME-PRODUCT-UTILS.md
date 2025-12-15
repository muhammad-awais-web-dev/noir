# Product Image/Variant Mapping Guide

## The Problem
Shopify product JSON has a complex relationship between variants (colors) and images. There are **3 different ways** images connect to variants in the same JSON file.

## The Three Connection Methods

### 1. Variant → Image (Direct Link)
Each variant has an `image_id` field:
```json
{
  "variants": [
    {
      "id": 50750584324374,
      "title": "Orange",
      "image_id": 53045185872150,  // ← Points to specific image
      "price": "4299.00"
    }
  ]
}
```

### 2. Image → Variant (Reverse Link)
Each image has a `variant_ids` array:
```json
{
  "images": [
    {
      "id": 53045185872150,
      "src": "https://...",
      "variant_ids": [50750584324374],  // ← Points back to variant(s)
      "alt": "#color_Orange"
    }
  ]
}
```

### 3. Alt Text Matching (Gallery Images)
Most gallery images have **empty** `variant_ids` but use `alt` text:
```json
{
  "id": 53045186002134,
  "src": "https://...",
  "variant_ids": [],  // ← Empty!
  "alt": "#color_Orange"  // ← Use this to match
}
```

## The Logic Flow

```
Step 1: Create base structure for each variant
  └─ Loop through variants array
     └─ Create object: { name, price, mainImage: '', gallery: [] }

Step 2: Assign main images
  └─ Loop through images array
     └─ If image.variant_ids has IDs:
        └─ Find matching variant
           └─ Set as mainImage

Step 3: Build galleries
  └─ Loop through images again
     └─ If alt text contains color name:
        └─ Add to that color's gallery
           └─ Skip if already used as mainImage
```

## Example Implementation Pattern

```typescript
function organizeProductData(product: any) {
  const organized: Record<string, VariantData> = {};

  // Step 1: Initialize
  product.variants.forEach((variant) => {
    organized[variant.title] = {
      id: variant.id,
      name: variant.title,
      price: variant.price,
      mainImage: '',
      gallery: []
    };
  });

  // Step 2 & 3: Process images
  product.images.forEach((image) => {
    // Check direct variant_ids connection
    if (image.variant_ids.length > 0) {
      // Find and assign main image
    }

    // Check alt text for gallery images
    Object.keys(organized).forEach((colorName) => {
      if (image.alt && image.alt.includes(colorName)) {
        // Add to gallery (if not already main)
      }
    });
  });

  return organized;
}
```

## What You Get Back

```typescript
{
  "Orange": {
    id: 50750584324374,
    name: "Orange",
    price: "4299.00",
    mainImage: "https://cdn.shopify.com/...", // The hero image
    gallery: [
      "https://cdn.shopify.com/...",  // Additional angles
      "https://cdn.shopify.com/...",
      "https://cdn.shopify.com/..."
    ]
  },
  "Black": { ... },
  "Silver": { ... }
}
```

## Common Pitfalls

1. **Don't mutate the images array** - Use `.forEach()` or `.map()`, not `.splice()`
2. **Alt text might be null** - Always check `if (image.alt && ...)`
3. **Case sensitivity** - The alt text is `#color_Orange`, not `#color_orange`
4. **Duplicate detection** - Check if `mainImage !== image.src` before adding to gallery
5. **Missing images** - Some variants might not have images at all

## Testing Your Logic

Log the raw product data first:
```typescript
console.log('Variants:', product.variants);
console.log('Images:', product.images);
```

Then test your organized output:
```typescript
const organized = organizeProductData(product);
console.log('Organized:', organized);
```

Check:
- ✓ Does each color have a mainImage?
- ✓ Are gallery arrays populated?
- ✓ Are there duplicates between main and gallery?
- ✓ Are all images accounted for?

## UI Usage

Once organized, switching colors is simple:
```typescript
const [selectedColor, setSelectedColor] = useState('Orange');
const currentVariant = organized[selectedColor];

// Show main image
<img src={currentVariant.mainImage} />

// Show gallery
currentVariant.gallery.map(src => <img src={src} />)
```

## Edge Cases to Handle

1. **Product with no variants** - Use product.images directly
2. **Variant with no image_id** - Fall back to first product image
3. **Alt text doesn't match** - Use loose matching (`.toLowerCase().includes()`)
4. **Multiple colors in one variant** - "Rose Gold" needs special handling

---

Good luck! The key is understanding that Shopify uses all three methods together, not just one.
