#!/usr/bin/env bash
set -euo pipefail

slide_dir="apps/slides/decks/assets/course-01"
portal_dir="apps/portal/public/visuals/course-01"

# Delete only numbered GIF source frames. Do not use broad patterns such as
# tay*.png because that also matches the final asset taylor_orders.png.
patterns=(
  'limitsf[0-9][0-9].png'
  'derivf[0-9][0-9].png'
  'intf[0-9][0-9].png'
  'tay[0-9][0-9].png'
  'gradf[0-9][0-9].png'
  'jacf[0-9][0-9].png'
  'optf[0-9][0-9].png'
  'lagf[0-9][0-9].png'
)

expected=(
  limits_continuity.png limits_approach.gif
  derivative_secant_tangent.png secant_to_tangent.gif
  chain_rule_flow.png onevar_optimization.png
  integral_riemann.png integral_accumulation.gif
  taylor_orders.png taylor_progression.gif
  multivar_surface_slices.png
  gradient_direction.png directional_derivative.gif
  jacobian_grid.png jacobian_grid_deform.gif
  hessian_contours.png hessian_heatmap.png
  multivar_chain_graph.png
  unconstrained_paths.png optimization_trajectories.gif
  lagrange_touch.png lagrange_levels.gif
)

for dir in "$slide_dir" "$portal_dir"; do
  test -d "$dir" || { echo "ERROR: missing $dir" >&2; exit 1; }
  for pattern in "${patterns[@]}"; do
    find "$dir" -maxdepth 1 -type f -name "$pattern" -delete
  done

  missing=0
  for name in "${expected[@]}"; do
    if [ ! -f "$dir/$name" ]; then
      echo "ERROR: missing $dir/$name" >&2
      missing=1
    fi
  done
  if [ "$missing" -ne 0 ]; then
    exit 1
  fi

  count=$(find "$dir" -maxdepth 1 -type f \( -name '*.png' -o -name '*.gif' \) | wc -l | tr -d ' ')
  if [ "$count" -ne 22 ]; then
    echo "ERROR: expected exactly 22 final assets in $dir, found $count" >&2
    echo "Current files:" >&2
    find "$dir" -maxdepth 1 -type f \( -name '*.png' -o -name '*.gif' \) -printf '%f\n' | sort >&2
    exit 1
  fi
done

echo "PASS: Course 01 assets cleaned; 22 final assets remain in each asset directory."
